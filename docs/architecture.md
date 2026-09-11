# Arquitetura de produção — Autonomous Survival Agent

## 1. Infraestrutura e eficiência de tokens

**Runtime:** Node.js 22 + TypeScript. Vercel hospeda a camada web/API; workloads longos podem migrar para workers dedicados.

**Token router:** tarefas simples devem usar regras determinísticas e scripts locais; modelos leves ficam para parsing/classificação; modelos avançados só para planejamento complexo e mudanças de código revisáveis.

**MCP:** camada de ferramentas isolada do núcleo financeiro. O modelo solicita ações; políticas determinísticas validam antes da execução.

## 2. Renda ativa

Prioridade econômica:
1. Micro-SaaS/serviços digitais.
2. APIs pagas e tarefas de processamento.
3. x402 para APIs de uso unitário.
4. Mercados DEX/predição somente em modo de simulação até existir histórico e limites.

x402 V2 é adequado para pagamentos HTTP de máquina para máquina e suporta múltiplas redes e extensões; a integração deve ser feita como uma camada separada do checkout Stripe. Não é necessário substituir Stripe por x402: eles resolvem fluxos diferentes. citeturn341259search0turn341259search3

## 3. Renda passiva

O worker calcula custo de CPU, gás e infraestrutura antes de iniciar qualquer atividade. Yield DeFi é tratado como uma estratégia secundária e segregada da reserva operacional. Nenhuma aplicação automática deve usar a reserva para buscar rendimento.

## 4. Treasury / Profit Sweep

`lucro_liquido = saldo - reserva_operacional - cota_clonagem`

O sweep permanece desabilitado por padrão. Quando habilitado, deve exigir endereço de proprietário pré-configurado, valor mínimo, limite diário e registro auditável.

## 5. Life loop

Estados:
- `ALIVE`: capital acima da reserva.
- `DEGRADED`: capital na faixa de reserva; somente ações essenciais.
- `DEAD`: saldo zero; parada segura.

A matriz de decisão combina retorno esperado, custo, risco e velocidade. Nenhum LLM envia transação diretamente.

## 6. Replicação

Filhos são instâncias isoladas com identidade própria. A criação da chave pode ser automática; o financiamento de um filho exige uma política separada, limite de gasto e aprovação do treasury. Autoreplicação financeira automática permanece desligada.

## 7. Guardrails

- Nunca expor chaves privadas ao modelo.
- Nunca alterar `OWNER_WALLET_ADDRESS` via prompt.
- Nunca contornar limites ou logs.
- Nunca realizar fraude, manipulação de mercado ou evasão regulatória.
- Parar em caso de inconsistência de saldo, RPC, assinatura ou política.
- Real money somente após testes, segregação de fundos e revisão humana.

## 8. Billing

O plano atual é `Autonomous Survival Pro` a R$29,90/mês. O checkout é Stripe em produção. A camada Stripe gera o sinal financeiro; o sistema de entitlements precisa de armazenamento persistente antes de conceder acesso privado ao SaaS automaticamente.
