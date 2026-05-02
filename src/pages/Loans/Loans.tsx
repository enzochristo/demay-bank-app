import { useEffect, useState } from 'react'
import { PlusIcon, CheckCircleIcon, CalendarIcon } from '@phosphor-icons/react'
import { getLoans, createLoan } from '@/services/loans'
import type { Loan } from '@/types'

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [valorInicial, setValorInicial] = useState('')
  const [applying, setApplying] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const [applySuccess, setApplySuccess] = useState(false)

  useEffect(() => {
    getLoans()
      .then(setLoans)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleApply(e: React.FormEvent) {
    e.preventDefault()
    setApplyError(null)
    setApplySuccess(false)
    setApplying(true)

    try {
      const loan = await createLoan({ valor_inicial: parseFloat(valorInicial) })
      setLoans((prev) => [loan, ...prev])
      setApplySuccess(true)
      setValorInicial('')
    } catch (e: unknown) {
      setApplyError(e instanceof Error ? e.message : 'Loan request failed.')
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-white text-2xl font-semibold">Loans</h1>
        <p className="text-white/40 text-sm mt-1">Your active loans and apply for new ones</p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-white/70 text-sm font-semibold uppercase tracking-wide">Apply for a Loan</h2>
        <form
          onSubmit={handleApply}
          className="flex flex-col gap-4 rounded-xl border border-border bg-dark-purple p-6 max-w-md"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-xs font-medium uppercase tracking-wide">
              Requested Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
              <input
                required
                type="number"
                min="1"
                step="0.01"
                value={valorInicial}
                onChange={(e) => setValorInicial(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-border bg-white/5 pl-8 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {applyError && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {applyError}
            </div>
          )}

          {applySuccess && (
            <div className="flex items-center gap-2 rounded-lg border border-contrast/30 bg-contrast/10 px-4 py-3 text-sm text-contrast">
              <CheckCircleIcon size={16} weight="fill" />
              Loan application submitted.
            </div>
          )}

          <button
            type="submit"
            disabled={applying}
            className="flex items-center justify-center gap-2 rounded-lg bg-low-contrast px-4 py-2.5 text-sm font-medium text-white transition-all hover:brightness-125 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon size={16} weight="bold" />
            {applying ? 'Submitting...' : 'Apply'}
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-white/70 text-sm font-semibold uppercase tracking-wide">My Loans</h2>

        {loading && <div className="text-white/40 text-sm">Loading loans...</div>}

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && loans.length === 0 && (
          <div className="rounded-lg border border-border px-6 py-10 text-center text-white/40 text-sm">
            No active loans.
          </div>
        )}

        {!loading && loans.length > 0 && (
          <div className="flex flex-col gap-3">
            {loans.map((loan) => (
              <div
                key={loan.id}
                className="rounded-xl border border-border bg-dark-purple px-5 py-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-lg">
                    ${loan.valor_inicial.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <CalendarIcon size={13} />
                    {new Date(loan.data_emprestimo).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="text-white/40 text-xs">Interest Rate</p>
                    <p className="text-white text-sm font-medium mt-0.5">{loan.juros}%</p>
                  </div>
                  <div className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="text-white/40 text-xs">Monthly Payment</p>
                    <p className="text-white text-sm font-medium mt-0.5">
                      ${loan.pagamento_mensal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
