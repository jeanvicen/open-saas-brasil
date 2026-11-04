# SaaS Barbearia — exemplo funcional

Next.js 15.5.28 App Router, Tailwind, Prisma/PostgreSQL e NextAuth v4. O app implementa autenticação por Google (opcional/configurável) e por CPF + senha com bcrypt, cadastro de clientes por conta, dashboard com clientes/agendamentos reais, criação de horários futuros vinculados a clientes da própria conta e geração de cobrança PIX estática.

## Início

Na raiz do monorepo, `cp .env.example .env`, configure PostgreSQL, segredo NextAuth e dados PIX, depois `npm install`, `npx prisma db push --schema=packages/db/prisma/schema.prisma` e `npm run dev:barbearia`. A chave PIX deve ser sua e o nome/cidade devem corresponder ao recebedor. Não use dados de exemplo em produção.

Cadastro CPF/senha exige senha mínima de 12 caracteres; CPF não é fator de autenticação. Não há verificação de identidade, MFA, recuperação de senha nem limitação de tentativas nesta versão. Adicione rate limiting, verificação compatível com seu risco e fluxo de recuperação seguro antes de público. Google OAuth só aparece quando ambas as credenciais estão presentes. Cadastros ainda são abertos; controle implantação e abuso.

## Limites

Agendamentos futuros podem ser criados na agenda usando clientes da própria conta e consultados em ordem cronológica; edição e cancelamento ainda não estão disponíveis. O dashboard apresenta a agenda do dia. Não há confirmação de disponibilidade/conflitos de cadeira: configure a operação e valide horários manualmente. PIX usa payload estático e mostra status sempre pendente, não recebe confirmação. Não existe webhook implementado: contrato em `packages/pix` requer adapter de PSP com autenticação de webhook, idempotência, replay protection e reconciliação. WhatsApp não está integrado. Formulários usam validação e respostas de erro; endpoints de clientes/pagamentos verificam sessão e escopo `userId`.

Prisma `db push` inicial é apenas para desenvolvimento. Configure migrations, backups, TLS, rate limit, monitoramento, termos/privacidade, revisão das rotas de cadastro e testes com Postgres real antes de produção. Next 15.5.28 escolhido por patch de segurança oficial de 14/10/2026; não usar Next 14 sem reavaliar vulnerabilidades.
