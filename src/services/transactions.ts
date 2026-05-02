import { http } from './http'
import type { Transaction } from '@/types'

export function getTransactions() {
  return http<Transaction[]>('/transactions')
}

export function sendTransaction(payload: { id_receptor: string; valor: number }) {
  return http<Transaction>('/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
