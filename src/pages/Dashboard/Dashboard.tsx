import { useEffect, useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'
import { getTransactions } from '@/services/transactions'
import type { Transaction } from '@/types'

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentUserId = localStorage.getItem('userId') ?? ''

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-white text-2xl font-semibold">Transaction History</h1>
        <p className="text-white/40 text-sm mt-1">All your incoming and outgoing transfers</p>
      </div>

      {loading && (
        <div className="text-white/40 text-sm">Loading transactions...</div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <div className="rounded-lg border border-border px-6 py-10 text-center text-white/40 text-sm">
          No transactions yet.
        </div>
      )}

      {!loading && transactions.length > 0 && (
        <div className="flex flex-col gap-2">
          {transactions.map((tx) => {
            const sent = tx.id_sender === currentUserId
            return (
              <div
                key={tx.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-dark-purple px-5 py-4"
              >
                <div
                  className={twMerge(
                    'flex items-center justify-center w-9 h-9 rounded-full shrink-0',
                    sent ? 'bg-destructive/15 text-destructive' : 'bg-contrast/15 text-contrast',
                  )}
                >
                  {sent ? <ArrowUpIcon size={17} weight="bold" /> : <ArrowDownIcon size={17} weight="bold" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {sent ? `To: ${tx.id_receptor}` : `From: ${tx.id_sender}`}
                  </p>
                  {tx.created_at && (
                    <p className="text-white/40 text-xs mt-0.5">
                      {new Date(tx.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>

                <span
                  className={twMerge(
                    'text-sm font-semibold',
                    sent ? 'text-destructive' : 'text-contrast',
                  )}
                >
                  {sent ? '-' : '+'}${tx.valor.toFixed(2)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
