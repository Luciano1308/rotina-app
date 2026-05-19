// ============================================================
// ROTINA-APP — Tipos TypeScript
// ============================================================

export type StatusTarefa = 'pendente' | 'em_andamento' | 'concluida'
export type PrioridadeTarefa = 'baixa' | 'normal' | 'alta' | 'urgente'

export interface Tarefa {
  id: number
  titulo: string
  descricao: string | null
  status: StatusTarefa
  prioridade: PrioridadeTarefa
  data_criacao: string
  data_conclusao: string | null
}

export interface AtualizarTarefaPayload {
  status?: StatusTarefa
  data_conclusao?: string | null
  titulo?: string
  descricao?: string | null
  prioridade?: PrioridadeTarefa
}

// Mapeamentos para exibição
export const STATUS_LABEL: Record<StatusTarefa, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluida: 'Concluída',
}

export const PRIORIDADE_LABEL: Record<PrioridadeTarefa, string> = {
  baixa: 'Baixa',
  normal: 'Normal',
  alta: 'Alta',
  urgente: 'Urgente',
}

export const STATUS_COR: Record<StatusTarefa, string> = {
  pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  em_andamento: 'bg-blue-100 text-blue-800 border-blue-200',
  concluida: 'bg-green-100 text-green-800 border-green-200',
}

export const PRIORIDADE_COR: Record<PrioridadeTarefa, string> = {
  baixa: 'bg-gray-100 text-gray-600 border-gray-200',
  normal: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  alta: 'bg-orange-100 text-orange-700 border-orange-200',
  urgente: 'bg-red-100 text-red-700 border-red-200',
}
