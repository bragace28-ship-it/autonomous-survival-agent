export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'autonomous-survival-agent',
    mode: process.env.DRY_RUN === 'false' ? 'guarded-live' : 'dry-run',
    trading: process.env.ENABLE_LIVE_TRADING === 'true' ? 'enabled-by-policy' : 'blocked',
    timestamp: new Date().toISOString()
  });
}
