import { http, httpTransactions } from './http'
import type { Transaction } from '@/types'

export function getTransactions() {
  return http<Transaction[]>('/transactions')
}

export function sendTransaction(payload: { id_sender: number; id_receptor: number; valor: number }) {
  return httpTransactions<Transaction>('/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
