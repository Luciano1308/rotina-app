'use client'

// ============================================================
// ROTINA-APP — Hook principal de tarefas
// ============================================================
import { useState, useEffect, useCallback } from 'react'
import { buscarTarefas, concluirTarefa, reabrirTarefa } from '@/lib/supabase'
import type { Tarefa, StatusTarefa } from '@/lib/types'

interface UseTarefasReturn {
  tarefas: Tarefa[]
  tarefasFiltradas: Tarefa[]
  carregando: boolean
  erro: string | null
  filtroStatus: StatusTarefa | 'todas'
  setFiltroStatus: (status: StatusTarefa | 'todas') => void
  concluir: (id: number) => Promise<void>
  reabrir: (id: number) => Promise<void>
  recarregar: () => Promise<void>
  totalPendentes: number
  totalConcluidas: number
}

export function useTarefas(): UseTarefasReturn {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState<StatusTarefa | 'todas'>('todas')

  const recarregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      const dados = await buscarTarefas()
      setTarefas(dados)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao carregar tarefas')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    recarregar()
  }, [recarregar])

  const concluir = useCallback(async (id: number) => {
    try {
      const tarefaAtualizada = await concluirTarefa(id)
      setTarefas(prev =>
        prev.map(t => (t.id === id ? tarefaAtualizada : t))
      )
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao concluir tarefa')
      throw e
    }
  }, [])

  const reabrir = useCallback(async (id: number) => {
    try {
      const tarefaAtualizada = await reabrirTarefa(id)
      setTarefas(prev =>
        prev.map(t => (t.id === id ? tarefaAtualizada : t))
      )
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao reabrir tarefa')
      throw e
    }
  }, [])

  const tarefasFiltradas = filtroStatus === 'todas'
    ? tarefas
    : tarefas.filter(t => t.status === filtroStatus)

  const totalPendentes = tarefas.filter(t => t.status !== 'concluida').length
  const totalConcluidas = tarefas.filter(t => t.status === 'concluida').length

  return {
    tarefas,
    tarefasFiltradas,
    carregando,
    erro,
    filtroStatus,
    setFiltroStatus,
    concluir,
    reabrir,
    recarregar,
    totalPendentes,
    totalConcluidas,
  }
}
