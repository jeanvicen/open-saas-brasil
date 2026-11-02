# Como validar e vender um SaaS local

Este guia é educativo, não promessa de renda nem aconselhamento jurídico/contábil. Faça entrevistas e um piloto antes de cobrar.

## Oferta e preço

Exemplo para testar: R$ 97/mês por unidade, com onboarding e suporte definidos. É apenas hipótese de preço: avalie disposição a pagar, concorrentes, tributos, taxas, churn, atendimento e custo de aquisição. Não prometa retorno financeiro. Descreva o que está incluído, limites, prazo de resposta, cancelamento e disponibilidade.

## Custos e operação

Faça orçamento de hospedagem, banco e backups, domínio, e-mail, observabilidade, provedor de autenticação, taxas do PSP, suporte, tributos e horas de manutenção. Tenha alertas e plano de recuperação, teste restauração e defina quem responde a incidentes. Reserve margem de capacidade; grátis não significa custo zero.

## Segurança e LGPD

Colete somente dados necessários, documente finalidade e base legal com orientação especializada, publique aviso de privacidade e retenção, proteja acesso e backups e implemente atendimento a titulares. Evite guardar dados sensíveis desnecessários. Use TLS, segredos fora do git, atualizações, logs sem CPF/senha/chaves, rate limiting, autorização por tenant e revisão independente. Tenha processo para incidentes e exclusão/portabilidade quando aplicável.

## PIX e mensagens

QR estático inicia pagamento, não é confirmação. Para baixa automática contrate PSP que ofereça API/webhooks, verifique assinatura, replay e idempotência, reconcilie extrato e teste estornos. Nunca marque como pago só por retorno do navegador. Mensagens WhatsApp comerciais precisam de plataforma/provedor permitido, opt-in e regras aplicáveis; este projeto não envia mensagens.

## Implantação

Use domínio e HTTPS, Postgres gerenciado com backups, migrations revisadas, segredos fortes, contas segregadas, ambiente de homologação e testes de restauração. Teste isolamento entre empresas com dois usuários e revise controles de acesso, termos e suporte antes de abrir cadastros.
