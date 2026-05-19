'use client'

// ============================================================
// ROTINA-APP — Card de Tarefa (listagem)
// ============================================================
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Circle, ChevronRight, Clock, AlertTriangle } from 'lucide-react'
import { cn, tempoRelativo } from '@/lib/utils'
import {
  STATUS_LABEL,
  STATUS_COR,
  PRIORIDADE_LABEL,
  PRIORIDADE_COR,
  type Tarefa,
} from '@/lib/types'

interface TarefaCardProps {
  tarefa: Tarefa
  onConcluir: (id: number) => Promise<void>
}

export function TarefaCard({ tarefa, onConcluir }: TarefaCardProps) {
  const router = useRouter()
  const [concluindo, setConcluindo] = useState(false)
  const concluida = tarefa.status === 'concluida'

  async function handleConcluir(e: React.MouseEvent) {
    e.stopPropagation()
    if (concluida || concluindo) return
    setConcluindo(true)
    try {
      await onConcluir(tarefa.id)
    } finally {
      setConcluindo(false)
    }
  }

  return (
    <div
      onClick={() => router.push(`/tarefa/${tarefa.id}`)}
      className={cn(
        'flex items-center gap-4 p-4 rounded-2xl border bg-white cursor-pointer',
        'active:scale-[0.98] transition-all duration-150 select-none',
        'shadow-sm hover:shadow-md',
        concluida && 'opacity-60'
      )}
    >
      {/* Botão concluir */}
      <button
        onClick={handleConcluir}
        disabled={concluida || concluindo}
        aria-label={concluida ? 'Tarefa concluída' : 'Marcar como concluída'}
        className={cn(
          'flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors',
          concluida
            ? 'text-green-500'
            : 'text-gray-300 hover:text-green-400 active:scale-90'
        )}
      >
        {concluindo ? (
          <span className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
        ) : concluida ? (
          <CheckCircle2 className="w-7 h-7" />
        ) : (
          <Circle className="w-7 h-7" />
        )}
      </button>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-base font-semibold text-gray-800 truncate',
          concluida && 'line-through text-gray-400'
        )}>
          {tarefa.titulo}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full border',
            STATUS_COR[tarefa.status]
          )}>
            {STATUS_LABEL[tarefa.status]}
          </span>
          {tarefa.prioridade !== 'normal' && (
            <span className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1',
              PRIORIDADE_COR[tarefa.prioridade]
            )}>
              {tarefa.prioridade === 'urgente' && <AlertTriangle className="w-3 h-3" />}
              {PRIORIDADE_LABEL[tarefa.prioridade]}
            </span>
          )}
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {concluida && tarefa.data_conclusao
              ? `Concluída ${tempoRelativo(tarefa.data_conclusao)}`
              : tempoRelativo(tarefa.data_criacao)}
          </span>
        </div>
      </div>

      {/* Seta */}
      <ChevronRight className="flex-shrink-0 w-5 h-5 text-gray-300" />
    </div>
  )
}
