'use client'

// ============================================================
// ROTINA-APP — Tela de Detalhe da Tarefa
// ============================================================
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft, CheckCircle2, RotateCcw, Clock, Calendar,
  AlertTriangle, Loader2
} from 'lucide-react'
import { buscarTarefaPorId, concluirTarefa, reabrirTarefa } from '@/lib/supabase'
import { formatarData, tempoRelativo } from '@/lib/utils'
import { cn } from '@/lib/utils'
import {
  STATUS_LABEL, STATUS_COR, PRIORIDADE_LABEL, PRIORIDADE_COR,
  type Tarefa
} from '@/lib/types'

export default function TarefaDetalhePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [tarefa, setTarefa] = useState<Tarefa | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [processando, setProcessando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      const dados = await buscarTarefaPorId(Number(id))
      setTarefa(dados)
      setCarregando(false)
    }
    carregar()
  }, [id])

  async function handleConcluir() {
    if (!tarefa || processando) return
    setProcessando(true)
    setErro(null)
    try {
      const atualizada = await concluirTarefa(tarefa.id)
      setTarefa(atualizada)
    } catch {
      setErro('Não foi possível concluir a tarefa. Tente novamente.')
    } finally {
      setProcessando(false)
    }
  }

  async function handleReabrir() {
    if (!tarefa || processando) return
    setProcessando(true)
    setErro(null)
    try {
      const atualizada = await reabrirTarefa(tarefa.id)
      setTarefa(atualizada)
    } catch {
      setErro('Não foi possível reabrir a tarefa. Tente novamente.')
    } finally {
      setProcessando(false)
    }
  }

  const concluida = tarefa?.status === 'concluida'

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    )
  }

  if (!tarefa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <p className="text-gray-500">Tarefa não encontrada.</p>
        <button onClick={() => router.back()} className="text-indigo-600 font-medium">
          Voltar
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 truncate">
            Detalhe da Tarefa
          </h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-6 space-y-6">
        {/* Título */}
        <div>
          <h2 className={cn(
            'text-2xl font-bold text-gray-900 leading-tight',
            concluida && 'line-through text-gray-400'
          )}>
            {tarefa.titulo}
          </h2>
          {tarefa.descricao && (
            <p className="mt-2 text-gray-500 text-base leading-relaxed">
              {tarefa.descricao}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={cn(
            'text-sm font-semibold px-3 py-1.5 rounded-full border',
            STATUS_COR[tarefa.status]
          )}>
            {STATUS_LABEL[tarefa.status]}
          </span>
          <span className={cn(
            'text-sm font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1.5',
            PRIORIDADE_COR[tarefa.prioridade]
          )}>
            {tarefa.prioridade === 'urgente' && <AlertTriangle className="w-4 h-4" />}
            Prioridade {PRIORIDADE_LABEL[tarefa.prioridade]}
          </span>
        </div>

        {/* Informações de data */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <div className="flex items-center gap-3 px-4 py-3">
            <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Criada em</p>
              <p className="text-sm font-medium text-gray-700">
                {formatarData(tarefa.data_criacao)}
              </p>
            </div>
          </div>
          {concluida && tarefa.data_conclusao && (
            <div className="flex items-center gap-3 px-4 py-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Concluída em</p>
                <p className="text-sm font-medium text-gray-700">
                  {formatarData(tarefa.data_conclusao)}
                </p>
                <p className="text-xs text-gray-400">
                  {tempoRelativo(tarefa.data_conclusao)}
                </p>
              </div>
            </div>
          )}
          {!concluida && (
            <div className="flex items-center gap-3 px-4 py-3">
              <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Aguardando conclusão</p>
                <p className="text-sm font-medium text-gray-700">
                  Criada {tempoRelativo(tarefa.data_criacao)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-red-600 text-sm">{erro}</p>
          </div>
        )}
      </main>

      {/* Botão de ação principal — fixo no fundo */}
      <div className="sticky bottom-0 px-4 py-4 bg-gray-50 border-t border-gray-100">
        {concluida ? (
          <button
            onClick={handleReabrir}
            disabled={processando}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-4 rounded-2xl',
              'bg-gray-200 text-gray-700 font-semibold text-base',
              'active:scale-[0.98] transition-all',
              processando && 'opacity-60 cursor-not-allowed'
            )}
          >
            {processando ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <RotateCcw className="w-5 h-5" />
            )}
            Reabrir Tarefa
          </button>
        ) : (
          <button
            onClick={handleConcluir}
            disabled={processando}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-4 rounded-2xl',
              'bg-indigo-600 text-white font-semibold text-base shadow-lg shadow-indigo-200',
              'active:scale-[0.98] transition-all',
              processando && 'opacity-60 cursor-not-allowed'
            )}
          >
            {processando ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
            Marcar como Concluída
          </button>
        )}
      </div>
    </div>
  )
}
