export const config = { runtime: 'edge' };

const encoder = new TextEncoder();

function hex(bytes) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sign(secret, payload) {
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  return hex(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
}

function parseStripeSignature(header) {
  const parts = String(header || '').split(',');
  const out = { timestamp: '', signatures: [] };
  for (const part of parts) {
    const [k, v] = part.split('=', 2);
    if (k === 't') out.timestamp = v;
    if (k === 'v1' && v) out.signatures.push(v);
  }
  return out;
}

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response('Webhook secret not configured', { status: 503 });

  const rawBody = await req.text();
  const header = req.headers.get('stripe-signature');
  const { timestamp, signatures } = parseStripeSignature(header);
  const ts = Number(timestamp);

  if (!timestamp || !Number.isFinite(ts) || signatures.length === 0) {
    return new Response('Invalid Stripe signature', { status: 400 });
  }

  // Reject stale webhook messages to reduce replay risk.
  if (Math.abs(Date.now() / 1000 - ts) > 300) {
    return new Response('Stale Stripe signature', { status: 400 });
  }

  const expected = await sign(secret, `${timestamp}.${rawBody}`);
  if (!signatures.some((sig) => safeEqual(sig, expected))) {
    return new Response('Invalid Stripe signature', { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  // Production integration point. Persistence/access provisioning is intentionally
  // separated from webhook verification so payment events can be handled safely.
  console.log('[stripe-webhook]', event.type, event.id);

  switch (event.type) {
    case 'checkout.session.completed':
    case 'invoice.paid':
    case 'invoice.payment_failed':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      // TODO: persist entitlement/subscription state in a database.
      break;
    default:
      break;
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
}
