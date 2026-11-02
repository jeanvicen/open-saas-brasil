# 🇧🇷 Open SaaS Brasil - 5 SaaS prontos com PIX pra você clonar e vender

[![Feito para 10M de devs BR](https://img.shields.io/badge/Feito%20para-10M%20de%20devs%20BR-16856b)](#)

Modelos open source para adaptar a pequenos negócios brasileiros. O selo é um lema, não uma estatística. **Barbearia** é a implementação funcional inicial; os outros quatro projetos são bases TODO e ainda não são produtos prontos.

| Projeto | Estado |
|---|---|
| [Barbearia](apps/saas-barbearia) | ✅ Login, clientes, agendamentos e geração de PIX estático implementados; exige configuração e validação operacional antes de produção. |
| [Clínica](apps/saas-clinica) | 🚧 TODO |
| [Loja](apps/saas-loja) | 🚧 TODO |
| [Academia](apps/saas-academia) | 🚧 TODO |
| [Imobiliária](apps/saas-imobiliaria) | 🚧 TODO |

## Por que isso vai te fazer ganhar dinheiro

Um ponto de partida aberto pode reduzir trabalho repetitivo e ajudar você a testar uma oferta para negócios locais. Não garante clientes, receita ou lucro: valide a demanda, custos, suporte e obrigações legais antes de vender. Leia [como vender](docs/como-vender.md).

## Começar (barbearia)

Pré-requisitos: Node.js 20.11+, npm 10+ e PostgreSQL 14+ local/de desenvolvimento. Google OAuth e PIX só funcionam depois de configurar provedores e segredos.

```bash
git clone https://github.com/jeanvicen/open-saas-brasil.git
cd open-saas-brasil
cp .env.example .env
# Edite .env com DATABASE_URL, NEXTAUTH_SECRET e dados PIX; não use valores de exemplo em produção
npm install
npx prisma db push --schema=packages/db/prisma/schema.prisma
npm run dev:barbearia
```

Acesse http://localhost:3000. `db push` é apropriado para desenvolvimento inicial; prefira migrations revisadas para ambientes compartilhados/produção. Senha não é derivada do CPF. O primeiro usuário cria conta com CPF e senha; mantenha senha forte. Google exige credenciais e URI de callback `http://localhost:3000/api/auth/callback/google` no Console Google.

## Segurança e limites

O exemplo usa Next.js 15.5.28 (linha de manutenção corrigida), não Next 14: o alerta oficial de 14/10/2026 recomenda versões 15.5.28 ou 16.4.1 contra vulnerabilidades críticas. Reavalie advisories e atualize dependências antes de expor à internet. Sessões e rotas autenticadas validam usuário no servidor; consultas de negócio sempre filtram por `userId`. HTTPS, rate limiting, backups, gestão de segredos, política de retenção e revisão legal continuam sendo responsabilidade da implantação.

PIX gerado é um BR Code estático para cobrança, não comprova recebimento nem atualiza pagamento. A interface de webhook não pode ser genérica: configure PSP/banco, autentique assinaturas, trate idempotência e reconciliação antes de confirmar pagamentos. WhatsApp depende de provedor oficial, consentimento e configuração; nada aqui envia mensagens. Consulte [documentação técnica](apps/saas-barbearia/README.md).

## Estrutura

- `apps/saas-barbearia`: aplicação Next.js demonstrável.
- `packages/ui`: componentes acessíveis com estilo shadcn/ui (primitives locais, sem geração falsa).
- `packages/auth`: configuração NextAuth e login por Google/CPF + senha.
- `packages/pix`: BR Code estático e contrato de adaptador PSP/webhook.
- `packages/db`: schema Prisma/PostgreSQL.
- `packages/brasil`: validações CPF, CNPJ e CEP.
- Outros apps: TODOs explícitos em cada pasta.

## Verificações

Testes locais: `npm run test:packages`; build: `npm run build:barbearia`. Eles não substituem teste E2E com PostgreSQL, Google OAuth, provedor PIX ou revisão de segurança.
