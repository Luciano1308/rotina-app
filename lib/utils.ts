import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formata data ISO para exibição em português */
export function formatarData(dataISO: string | null): string {
  if (!dataISO) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dataISO))
}

/** Retorna tempo relativo (ex: "há 2 horas") */
export function tempoRelativo(dataISO: string): string {
  const agora = new Date()
  const data = new Date(dataISO)
  const diffMs = agora.getTime() - data.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHoras = Math.floor(diffMin / 60)
  const diffDias = Math.floor(diffHoras / 24)

  if (diffMin < 1) return 'agora mesmo'
  if (diffMin < 60) return `há ${diffMin} min`
  if (diffHoras < 24) return `há ${diffHoras}h`
  if (diffDias === 1) return 'ontem'
  if (diffDias < 7) return `há ${diffDias} dias`
  return formatarData(dataISO)
}
