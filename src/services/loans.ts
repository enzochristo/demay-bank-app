import { http } from './http'
import type { Loan } from '@/types'

export function getLoans() {
  return http<Loan[]>('/loans')
}

export function createLoan(payload: { valor_inicial: number }) {
  return http<Loan>('/loans', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
