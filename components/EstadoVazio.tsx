'use client'

// ============================================================
// ROTINA-APP — Estado vazio / erro / carregando
// ============================================================
import { ClipboardList, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'

interface EstadoVazioProps {
  tipo: 'vazio' | 'erro' | 'carregando' | 'tudo_concluido'
  mensagem?: string
  onRetentar?: () => void
}

export function EstadoVazio({ tipo, mensagem, onRetentar }: EstadoVazioProps) {
  if (tipo === 'carregando') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        <p className="text-gray-400 text-sm">Carregando tarefas...</p>
      </div>
    )
  }

  if (tipo === 'erro') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <div className="text-center">
          <p className="text-gray-700 font-medium">Erro ao carregar</p>
          <p className="text-gray-400 text-sm mt-1">{mensagem}</p>
        </div>
        {onRetentar && (
          <button
            onClick={onRetentar}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium"
          >
            Tentar novamente
          </button>
        )}
      </div>
    )
  }

  if (tipo === 'tudo_concluido') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <CheckCircle2 className="w-12 h-12 text-green-400" />
        <div className="text-center">
          <p className="text-gray-700 font-semibold text-lg">Tudo concluído!</p>
          <p className="text-gray-400 text-sm mt-1">Todas as tarefas foram finalizadas.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <ClipboardList className="w-10 h-10 text-gray-300" />
      <div className="text-center">
        <p className="text-gray-500 font-medium">Nenhuma tarefa aqui</p>
        <p className="text-gray-400 text-sm mt-1">
          {mensagem ?? 'Novas tarefas aparecerão aqui.'}
        </p>
      </div>
    </div>
  )
}
