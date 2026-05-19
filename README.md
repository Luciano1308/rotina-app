# Rotina App

Sistema operacional interno para controle de tarefas diárias de colaboradores.

## Stack

- **Frontend:** Next.js 15 + React + TypeScript + TailwindCSS
- **Backend:** Supabase (PostgreSQL)
- **PWA:** next-pwa (instalável no celular)
- **Deploy:** Vercel

## Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Conta no [Vercel](https://vercel.com)
- Conta no [GitHub](https://github.com)

## Configuração rápida

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas chaves do Supabase

# 3. Executar em desenvolvimento
npm run dev
```

## Banco de dados

Execute o arquivo `supabase/schema.sql` no SQL Editor do Supabase para criar as tabelas e dados de exemplo.

## Estrutura do projeto

```
rotina-app/
├── app/                    # Páginas (Next.js App Router)
│   ├── layout.tsx          # Layout global + PWA metadata
│   ├── page.tsx            # Dashboard principal
│   └── tarefa/[id]/        # Tela de detalhe
├── components/             # Componentes React reutilizáveis
│   ├── TarefaCard.tsx      # Card da listagem
│   ├── FiltroStatus.tsx    # Filtros por status
│   └── EstadoVazio.tsx     # Estados de loading/erro/vazio
├── hooks/
│   └── useTarefas.ts       # Hook principal de dados
├── lib/
│   ├── supabase.ts         # Cliente e queries do Supabase
│   ├── types.ts            # Tipos TypeScript
│   └── utils.ts            # Utilitários (formatação etc.)
├── public/
│   ├── manifest.json       # Configuração PWA
│   └── icons/              # Ícones do app
└── supabase/
    └── schema.sql          # SQL completo do banco
```

## Roadmap — Fase 2

- [ ] Autenticação por empresa (multiempresa SaaS)
- [ ] Múltiplos funcionários com permissões
- [ ] Notificações push
- [ ] GPS e localização
- [ ] Upload de fotos de evidência
- [ ] Dashboard administrativo
- [ ] Tarefas recorrentes
- [ ] Relatórios e histórico avançado
