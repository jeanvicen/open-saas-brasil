# Open SaaS Brasil

Modelos open source para adaptar a pequenos negócios brasileiros. O repositório é um ponto de partida técnico, não um conjunto de produtos prontos para venda.

> **Estado atual:** a barbearia é o único app implementado, ainda com limites importantes para uso real. Clínica, loja, academia e imobiliária são esboços/documentação; confira o estado de cada pasta antes de iniciar uma adaptação.

## Apps e estado real

| App | Estado nesta versão |
|---|---|
| [Barbearia](apps/saas-barbearia) | Next.js com cadastro/login, área de clientes, dashboard e geração de BR Code PIX estático. A UI CRUD de agendamentos, confirmação automática de pagamentos e envio de mensagens não estão implementados. Não está pronta para produção. |
| [Clínica](apps/saas-clinica) | Documentação/TODO; não é um app funcional. |
| [Loja](apps/saas-loja) | Documentação/TODO; não é um app funcional. |
| [Academia](apps/saas-academia) | Documentação/TODO; não é um app funcional. |
| [Imobiliária](apps/saas-imobiliaria) | TODO; não é um app funcional. |

## Barbearia: executar localmente

### Requisitos

- Node.js **20.11 ou superior** e npm **10 ou superior**.
- PostgreSQL 14+ disponível para desenvolvimento.
- O app usa Google OAuth apenas se suas credenciais forem configuradas. PIX exige dados válidos do recebedor, mas a geração de código não confirma recebimento.

### Instalação

```bash
git clone https://github.com/jeanvicen/open-saas-brasil.git
cd open-saas-brasil
cp .env.example .env
```

Edite `.env` com a URL do seu banco local, um `NEXTAUTH_SECRET` gerado por você e, caso vá testar a geração de BR Code, os dados do seu próprio recebedor PIX. Não publique `.env`, não reutilize os valores de exemplo e nunca use dados de recebedor alheios. Para OAuth local, configure também o callback `http://localhost:3000/api/auth/callback/google` no provedor Google.

```bash
npm install
npx prisma db push --schema=packages/db/prisma/schema.prisma
npm run dev:barbearia
```

Abra http://localhost:3000. `db push` serve para desenvolvimento inicial; não substitui migrations revisadas em ambientes compartilhados ou produção. Neste repositório não há `package-lock.json`, portanto `npm install` não fixa a árvore exata de dependências e `npm ci` não é uma opção reproduzível neste estado. A geração/validação do lockfile é uma lacuna de setup conhecida.

## Testes disponíveis

```bash
npm run test:packages
npm run build:barbearia
```

Os testes de pacote cobrem validações brasileiras e geração de BR Code; o build não é teste de integração. Não há aqui prova de fluxo completo com PostgreSQL, Google OAuth, envio de PIX, webhook de PSP ou navegação E2E. Não declare essas integrações testadas sem executá-las com ambientes e credenciais próprios.

## Segurança, dados e limites

- Rotas de negócio autenticadas devem continuar restringindo consultas ao `userId` da sessão. Teste isolamento entre contas antes de disponibilizar o serviço.
- Cadastro por CPF e senha não verifica identidade, não tem recuperação de senha/MFA nem proteção contra tentativas automatizadas nesta versão. Não abra cadastro publicamente sem controles adicionais e revisão de segurança.
- O modelo guarda dados pessoais de clientes. Colete apenas o necessário, defina finalidade, base legal, retenção e atendimento a titulares com orientação adequada; evite dados sensíveis desnecessários.
- BR Code estático não comprova pagamento. O app não recebe confirmação nem altera o status automaticamente. Não marque uma cobrança como paga por retorno do navegador ou comprovante enviado pelo usuário. Uma integração real exige PSP/banco, webhook autenticado, idempotência, proteção contra replay e reconciliação.
- WhatsApp não está integrado; não há envio de mensagens. Uma futura integração deve usar provedor permitido e respeitar opt-in e regras aplicáveis.
- Antes de produção, planeje migrations, TLS, backups e teste de restauração, rate limiting, gestão de segredos, monitoramento, política de privacidade/retenção e revisão jurídica e de segurança. Não use o banco de desenvolvimento como ambiente de produção.

Leia o [guia técnico da barbearia](apps/saas-barbearia/README.md) e o [guia de validação comercial responsável](docs/como-vender.md). O projeto pode ajudar a experimentar uma solução, mas não promete clientes, renda ou lucro.

## Estrutura do monorepo

- `apps/saas-barbearia`: aplicação Next.js demonstrável.
- `apps/saas-clinica`, `apps/saas-loja`, `apps/saas-academia`, `apps/saas-imobiliaria`: pontos de partida incompletos, conforme descrito acima.
- `packages/auth`: configuração NextAuth e autenticação.
- `packages/db`: schema Prisma/PostgreSQL.
- `packages/brasil`: validações de CPF, CNPJ e CEP.
- `packages/pix`: geração de BR Code estático e contrato para futura integração.
- `packages/ui`: primitivas de interface locais.

## Contribuir

Contribuições devem deixar explícito o que é implementação funcional, o que depende de serviço/configuração externa e o que continua TODO. Prefira mudanças pequenas e testáveis, sem credenciais, dados pessoais reais ou alegações de integração que não foi executada.
