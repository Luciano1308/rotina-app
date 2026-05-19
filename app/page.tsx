'use client'

// ============================================================
// ROTINA-APP — Página Principal (Dashboard)
// ============================================================
import { RefreshCw, ClipboardList } from 'lucide-react'
import { useTarefas } from '@/hooks/useTarefas'
import { TarefaCard } from '@/components/TarefaCard'
import { FiltroStatus } from '@/components/FiltroStatus'
import { EstadoVazio } from '@/components/EstadoVazio'
import type { StatusTarefa } from '@/lib/types'

export default function HomePage() {
  const {
    tarefas,
    tarefasFiltradas,
    carregando,
    erro,
    filtroStatus,
    setFiltroStatus,
    concluir,
    recarregar,
    totalPendentes,
    totalConcluidas,
  } = useTarefas()

  const contadores = {
    todas: tarefas.length,
    pendente: tarefas.filter(t => t.status === 'pendente').length,
    em_andamento: tarefas.filter(t => t.status === 'em_andamento').length,
    concluida: totalConcluidas,
  } as Record<StatusTarefa | 'todas', number>

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">Rotina App</h1>
            </div>
            <button
              onClick={recarregar}
              disabled={carregando}
              aria-label="Recarregar tarefas"
              className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${carregando ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-sm text-gray-400">
            {totalPendentes > 0
              ? `${totalPendentes} tarefa${totalPendentes !== 1 ? 's' : ''} pendente${totalPendentes !== 1 ? 's' : ''}`
              : 'Nenhuma tarefa pendente 🎉'}
          </p>
        </div>
      </header>

      {/* Filtros */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <FiltroStatus
          atual={filtroStatus}
          onChange={setFiltroStatus}
          contadores={contadores}
        />
      </div>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-4 space-y-3">
        {carregando ? (
          <EstadoVazio tipo="carregando" />
        ) : erro ? (
          <EstadoVazio tipo="erro" mensagem={erro} onRetentar={recarregar} />
        ) : tarefasFiltradas.length === 0 ? (
          totalConcluidas === tarefas.length && tarefas.length > 0 ? (
            <EstadoVazio tipo="tudo_concluido" />
          ) : (
            <EstadoVazio tipo="vazio" />
          )
        ) : (
          tarefasFiltradas.map(tarefa => (
            <TarefaCard
              key={tarefa.id}
              tarefa={tarefa}
              onConcluir={concluir}
            />
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="px-4 py-4 text-center">
        <p className="text-xs text-gray-300">Rotina App v1.0</p>
      </footer>
    </div>
  )
}
