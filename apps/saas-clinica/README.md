# SaaS Clínica — base em planejamento

**Status: 🚧 TODO.** Esta pasta documenta o escopo futuro; não existe aplicação clínica pronta aqui.

## Produto previsto
- Cadastro de clínica/profissionais e gestão de pacientes com separação de dados por organização.
- Agenda com disponibilidade, conflitos, cancelamentos e histórico de auditoria.
- Pagamentos PIX via `@open-saas-brasil/pix`; confirmação somente por integração autenticada de um PSP.
- Prontuário com controle de acesso estrito, consentimento, criptografia e políticas de retenção adequadas à LGPD e às regras profissionais aplicáveis.

## Próximos passos
1. Definir papéis e limites de acesso a dados sensíveis com profissionais e assessoria jurídica.
2. Construir login seguro, gestão de organização e dashboard com dados reais.
3. Implementar agenda e prontuário auditável sem dados demonstrativos tratados como reais.
4. Integrar provedor PIX e testar webhook assinado, idempotência e reconciliação.
5. Acrescentar testes de autorização entre clínicas e validação de produção.

Não armazene prontuários reais até a implementação de segurança, controles de acesso e revisão legal. Veja a arquitetura compartilhada e o `.env.example` na raiz.
