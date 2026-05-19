-- ============================================================
-- ROTINA-APP — Schema do Banco de Dados
-- ============================================================
-- Execute este SQL no Supabase SQL Editor:
-- Supabase Dashboard → SQL Editor → New Query → Cole e clique Run
-- ============================================================

-- Tabela principal de tarefas
CREATE TABLE IF NOT EXISTS tarefas (
  id             BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  titulo         TEXT NOT NULL,
  descricao      TEXT,
  status         TEXT NOT NULL DEFAULT 'pendente'
                   CHECK (status IN ('pendente', 'em_andamento', 'concluida')),
  prioridade     TEXT NOT NULL DEFAULT 'normal'
                   CHECK (prioridade IN ('baixa', 'normal', 'alta', 'urgente')),
  data_criacao   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data_conclusao TIMESTAMPTZ
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_tarefas_status     ON tarefas (status);
CREATE INDEX IF NOT EXISTS idx_tarefas_prioridade ON tarefas (prioridade);
CREATE INDEX IF NOT EXISTS idx_tarefas_criacao    ON tarefas (data_criacao DESC);

-- ============================================================
-- Habilitar RLS (Row Level Security)
-- Preparado para SaaS — por enquanto permite acesso público
-- ============================================================
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;

-- Política temporária para MVP (sem autenticação ainda)
-- FASE 2: substituir por políticas por empresa/usuário
CREATE POLICY "acesso_publico_leitura"
  ON tarefas FOR SELECT
  USING (true);

CREATE POLICY "acesso_publico_atualizacao"
  ON tarefas FOR UPDATE
  USING (true);

-- ============================================================
-- Dados de exemplo para testar o sistema
-- ============================================================
INSERT INTO tarefas (titulo, descricao, status, prioridade) VALUES
  ('Limpar caixa d''água',        'Realizar limpeza completa da caixa d''água principal', 'pendente',     'alta'),
  ('Molhar jardim',               'Regar todas as plantas do jardim da entrada',           'pendente',     'normal'),
  ('Comprar ração',               'Comprar ração para os animais do sítio',                'pendente',     'normal'),
  ('Limpar calhas',               'Verificar e limpar todas as calhas do telhado',         'pendente',     'baixa'),
  ('Fazer depósito bancário',     'Depositar pagamentos recebidos esta semana',            'em_andamento', 'urgente'),
  ('Verificar estoque',           'Conferir itens no estoque e listar o que falta',        'pendente',     'normal'),
  ('Pintar portão da entrada',    'Lixar e pintar o portão principal com tinta grafite',   'pendente',     'baixa'),
  ('Trocar lâmpadas queimadas',   'Substituir lâmpadas queimadas no corredor e banheiro',  'concluida',    'normal'),
  ('Checar equipamentos',         'Testar todos os equipamentos elétricos',                'concluida',    'alta');

-- ============================================================
-- Verificação: mostrar o que foi criado
-- ============================================================
SELECT id, titulo, status, prioridade, data_criacao
FROM tarefas
ORDER BY data_criacao DESC;
