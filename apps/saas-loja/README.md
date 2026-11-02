# SaaS Loja — base em planejamento

**Status: 🚧 TODO.** Esta pasta descreve um produto futuro; não há loja pronta nem integração fiscal implementada.

## Escopo previsto
- Catálogo, variações, entradas/saídas de estoque e trilha de auditoria.
- Pedidos e geração de cobrança PIX por `@open-saas-brasil/pix`; pagamento só é confirmado via PSP.
- Emissão fiscal exige integração contratada com provedor autorizado, certificado e regras atualizadas. O projeto não implementa NF-e.

## Próximas etapas
1. Definir fluxo de vendas, cancelamento, devolução e inventário.
2. Implementar autenticação, dashboard, catálogo e operações transacionais.
3. Criar testes para concorrência e consistência do estoque.
4. Integrar PSP e provedor fiscal em homologação antes de produção.

Não use este TODO como sistema contábil/fiscal. O selo PIX não representa recebimento automático.
