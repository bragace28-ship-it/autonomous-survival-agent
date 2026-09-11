# Autonomous Survival Agent v2

Agente autônomo orientado a receita com foco em segurança operacional.

**DRY_RUN=true por padrão.** Nenhuma operação financeira real é executada pelo starter.

## Objetivo
- núcleo de decisão e ranking de oportunidades;
- reservas e tesouraria;
- limites determinísticos de risco;
- testes de segurança;
- preparação para hospedagem e integrações futuras.

## Segurança
- o modelo não recebe chaves privadas;
- reserva operacional fica protegida;
- operações especulativas exigem aprovação pelas políticas de risco;
- trading real permanece desligado até validação explícita.

## Próximas etapas
1. `npm install`
2. copiar `.env.example` para `.env`
3. `npm test`
4. `npm run sim`
5. depois conectar infraestrutura de hospedagem e pagamentos.
