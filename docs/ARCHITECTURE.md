# Arquitetura completa

## Camadas

```text
                  ┌──────────────────────────────┐
                  │      Autonomous Survival     │
                  │          Control Plane       │
                  └──────────────┬───────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
   Revenue Engine          Token Router             Risk Engine
        │                        │                        │
  SaaS / API tasks        LLM tiers / local        deterministic gate
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                         Tool / MCP adapters
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
             Web3/x402        Markets          Yield
                │                │                │
                └────────────────┼────────────────┘
                                 │
                             Treasury
                                 │
                      reserve / sweep policy
                                 │
                              Owner
```

## Runtime

- TypeScript/Node.js para o núcleo;
- Vercel para a camada web pública;
- Docker/worker separado quando houver necessidade de processos long-running;
- MCP/x402 tratados como adaptadores, nunca como autorização financeira;
- viem para EVM;
- carteira isolada para o agente.

## Token-efficiency router

- tarefas rotineiras: modelo barato ou processamento local;
- tarefas de estratégia/código: modelo avançado sob orçamento;
- cache e parsing determinístico antes de qualquer LLM;
- toda chamada externa tem orçamento e timeout.

## Fast-cash loops

### Micro-SaaS
Produto comercial principal. O agente mede demanda, custos, preço e conversão.

### API / tarefas pagas
Processamento autorizado de dados, documentos, conversões e rotinas úteis.

### Arbitragem / previsão
Somente leitura e simulação na versão atual. Execução real exige um módulo adicional de limites, aprovação e custódia segura.

## Yield

O worker pode calcular se um saldo ocioso compensa o custo de gás/infraestrutura. A versão atual é advisory-only.

## Treasury

```text
Saldo atual
   │
   ├── Reserva operacional
   ├── Cota de clonagem
   └── Excedente → candidato a sweep
```

## Morte

- `ALIVE`: operação normal;
- `DEGRADED`: preservar reservas, cortar risco;
- `DEAD`: saldo <= 0, encerrar loop.

## Autoreplicação

A identidade filha é gerada localmente. O código não transfere capital automaticamente. A camada de funding deve ficar atrás de aprovação humana porque uma transferência irreversível não pode depender somente de um LLM.

## Produção por etapas

1. Produto comercial + checkout.
2. Métricas de receita e custos.
3. Worker autônomo de baixo risco.
4. x402 para cobrança/consumo machine-to-machine onde fizer sentido.
5. Yield advisory.
6. Somente depois, módulos especulativos com capital limitado e kill switch.
