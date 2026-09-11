# Autonomous Survival Agent v2

Projeto dividido em duas camadas:

1. **Autonomous Survival Pro** — micro-SaaS de análise e automação comercial, com assinatura real de **R$ 29,90/mês** via Stripe.
2. **Survival Agent Core** — motor autônomo com ciclo de vida, ranking de oportunidades, tesouraria, limites de risco e preparação para Web3/x402.

## Estado atual

- Site hospedado em Vercel.
- Checkout Stripe em produção: `https://buy.stripe.com/4gM8wIeEeedVe1r32neME00`.
- Cartões habilitados na configuração Default da conta Stripe.
- `DRY_RUN=true` por padrão.
- Trading especulativo bloqueado por política.
- Sweep automático e clonagem automática desabilitados por padrão.
- Endpoint de saúde: `/api/health`.
- Endpoint de webhook Stripe com verificação de assinatura: `/api/stripe-webhook`.
- Páginas públicas de privacidade e termos: `/privacy.html` e `/terms.html`.

## Produto vendido

O plano Pro inclui calculadora de margem, ponto de equilíbrio, priorização de oportunidades e geração de mensagens/propostas comerciais. O produto não promete lucro, não é consultoria de investimento e não executa operações financeiras especulativas para o cliente.

## Segurança

- O modelo nunca recebe chaves privadas.
- Limites financeiros são determinísticos.
- Reserva operacional e cota de clonagem ficam protegidas.
- Operações especulativas exigem habilitação explícita.
- Webhook Stripe rejeita assinatura inválida ou evento com timestamp antigo.

## Produção

1. Conectar `STRIPE_WEBHOOK_SECRET` como variável de ambiente no Vercel.
2. Cadastrar `https://<dominio-vercel>/api/stripe-webhook` no Stripe para os eventos de Checkout/Subscription necessários.
3. Conectar um banco persistente para entitlements e estado de assinatura antes de liberar acesso pago privado.
4. Só depois avaliar x402, Aave/yield e operações de mercado em uma conta segregada e com limites explícitos.

## Desenvolvimento

```bash
npm install
npm test
npm run sim
```
