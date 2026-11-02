# SaaS Academia — escopo futuro

**Status: 🚧 TODO.** A pasta ainda não contém uma aplicação de academia executável.

## Planejamento
- Planos e matrículas, cadastro de alunos, presença e acompanhamento básico.
- Cobrança PIX por `@open-saas-brasil/pix`.
- PIX recorrente não é uma funcionalidade do QR estático; exige PSP com cobrança recorrente, autorização e notificações próprias.

## Implementação necessária
1. Definir papéis para gestão, instrutores e alunos e o isolamento dos dados.
2. Implementar login, CRUD de alunos/planos, dashboard e controle de acesso.
3. Integrar provedor para recorrência; tratar autorização, falha, cancelamento e reconciliação.
4. Criar testes de cobrança idempotente e acesso entre contas.

Não afirme cobrança recorrente nem recebimento confirmado sem integração com PSP.
