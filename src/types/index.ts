export interface Transaction {
  id: string
  id_sender: string
  id_receptor: string
  valor: number
  created_at?: string
}

export interface Loan {
  id: string
  id_user: string
  valor_inicial: number
  juros: number
  pagamento_mensal: number
  data_emprestimo: string
}

export interface User {
  id: string
  nome: string
  email: string
  saldo: number
}
