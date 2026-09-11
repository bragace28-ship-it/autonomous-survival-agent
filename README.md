# Autonomous Survival Agent — MVP de produção

Este repositório contém dois produtos relacionados, com funções separadas:

1. **Autonomous Survival Pro** — micro-SaaS comercial para análise e automação de vendas. É o produto que vamos vender aos clientes.
2. **Survival Agent Core** — motor autônomo financeiro/operacional, inicialmente em modo seguro, para controlar custo, risco, treasury, oportunidades e futuras integrações Web3.

## O que vamos implantar

### Produto comercial
- landing page pública em Vercel;
- calculadora de margem;
- calculadora de ponto de equilíbrio;
- explicação do produto e plano mensal;
- painel futuro de oportunidades, mensagens, propostas e acompanhamento;
- Stripe Billing para assinatura recorrente.

### Núcleo autônomo
- `src/core/life.ts`: estados ALIVE/DEGRADED/DEAD, burn rate e runway;
- `src/core/risk.ts`: matriz risco x velocidade e aprovação determinística;
- `src/core/loop.ts`: ciclo de decisão;
- `src/finance/treasury.ts`: reservas e profit sweep;
- `src/finance/yield.ts`: análise de yield sem execução automática;
- `src/integrations/x402.ts`: fronteira de integração para pagamentos x402;
- `src/integrations/polymarket.ts`: leitura de mercado sem envio de ordens;
- `src/replication/clone.ts`: geração de identidade filha sem transferência automática;
- `config/constitution.md`: guarda-corpos permanentes.

## Regras financeiras

`LUCRO_LIQUIDO = SALDO_ATUAL - (RESERVA_OPERACIONAL + COTA_DE_CLONAGEM)`

O sweep só é considerado quando o excedente ultrapassa `SWEEP_THRESHOLD_USDC` e o endereço do proprietário está validado. A implementação atual prepara o plano de sweep; a transferência real só deve ser ligada depois que a carteira e os limites forem revisados.

## Renda prioritária

1. Receita de clientes do micro-SaaS/API.
2. Tarefas automatizadas autorizadas pelo cliente.
3. Yield passivo de baixo risco após ROI/custo/liquidez.
4. Trading especulativo somente em uma etapa posterior e com limites explícitos.

## O que não está habilitado

- trading real;
- ordem automática em DEX/Polymarket;
- execução automática de depósitos em DeFi;
- financiamento automático de agentes filhos;
- exposição de chaves privadas ao LLM.

Esses pontos são deliberadamente separados porque o objetivo é colocar a operação comercial para gerar receita antes de arriscar capital.

## Segurança

- `DRY_RUN=true` por padrão;
- `TRADING_ENABLED=false` por padrão;
- o LLM é consultivo; políticas determinísticas autorizam ações financeiras;
- reservas são protegidas;
- falha de infraestrutura produz parada segura;
- mudanças de política financeira passam por Git/revisão.

## Execução local

```bash
npm install
npm test
npm run sim
```

## Vercel

O `index.html` é implantado como site estático. Cada push na branch principal pode gerar nova implantação pelo Git Integration.

## Stripe

O produto de produção criado é **Autonomous Survival Pro**, com assinatura de **R$ 29,90/mês**. O checkout Live depende de pelo menos um método de pagamento compatível estar ativo na conta Stripe.

Não coloque chaves Stripe, chaves Web3, seed phrases ou senhas neste repositório.
