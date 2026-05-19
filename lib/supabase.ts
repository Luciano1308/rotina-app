// ============================================================
// ROTINA-APP — Cliente Supabase
// ============================================================
import { createClient } from '@supabase/supabase-js'
import type { Tarefa, AtualizarTarefaPayload } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variáveis de ambiente do Supabase não configuradas. ' +
    'Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================================
// Funções de acesso ao banco de dados
// ============================================================

/** Busca todas as tarefas ordenadas por prioridade e data */
export async function buscarTarefas(): Promise<Tarefa[]> {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .order('data_criacao', { ascending: false })

  if (error) {
    console.error('Erro ao buscar tarefas:', error.message)
    throw new Error('Não foi possível carregar as tarefas.')
  }

  return data as Tarefa[]
}

/** Busca uma única tarefa pelo ID */
export async function buscarTarefaPorId(id: number): Promise<Tarefa | null> {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar tarefa:', error.message)
    return null
  }

  return data as Tarefa
}

/** Atualiza campos de uma tarefa */
export async function atualizarTarefa(
  id: number,
  payload: AtualizarTarefaPayload
): Promise<Tarefa> {
  const { data, error } = await supabase
    .from('tarefas')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar tarefa:', error.message)
    throw new Error('Não foi possível atualizar a tarefa.')
  }

  return data as Tarefa
}

/** Marca uma tarefa como concluída */
export async function concluirTarefa(id: number): Promise<Tarefa> {
  return atualizarTarefa(id, {
    status: 'concluida',
    data_conclusao: new Date().toISOString(),
  })
}

/** Reabre uma tarefa (volta para pendente) */
export async function reabrirTarefa(id: number): Promise<Tarefa> {
  return atualizarTarefa(id, {
    status: 'pendente',
    data_conclusao: null,
  })
}
