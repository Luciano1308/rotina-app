'use client'

// ============================================================
// ROTINA-APP — Filtro de Status
// ============================================================
import { cn } from '@/lib/utils'
import type { StatusTarefa } from '@/lib/types'

type FiltroOpcao = StatusTarefa | 'todas'

interface FiltroStatusProps {
  atual: FiltroOpcao
  onChange: (status: FiltroOpcao) => void
  contadores: Record<FiltroOpcao, number>
}

const OPCOES: { valor: FiltroOpcao; label: string }[] = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'pendente', label: 'Pendentes' },
  { valor: 'em_andamento', label: 'Em Andamento' },
  { valor: 'concluida', label: 'Concluídas' },
]

export function FiltroStatus({ atual, onChange, contadores }: FiltroStatusProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {OPCOES.map(({ valor, label }) => (
        <button
          key={valor}
          onClick={() => onChange(valor)}
          className={cn(
            'flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
            atual === valor
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
          )}
        >
          {label}
          <span className={cn(
            'text-xs px-1.5 py-0.5 rounded-full',
            atual === valor ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
          )}>
            {contadores[valor]}
          </span>
        </button>
      ))}
    </div>
  )
}
