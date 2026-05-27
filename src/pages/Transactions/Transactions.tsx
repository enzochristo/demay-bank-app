import { useState } from 'react'
import { PaperPlaneTiltIcon, CheckCircleIcon } from '@phosphor-icons/react'
import { sendTransaction } from '@/services/transactions'
import { getUsers } from '@/services/users'
import { getUserId } from '@/services/auth'
import { Select } from '@/components/Select/select'
import type { SelectOption } from '@/components/Form/types'

export default function Transactions() {
  const [recipientId, setRecipientId] = useState('')
  const [userOptions, setUserOptions] = useState<SelectOption[]>([])
  const [valor, setValor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const currentUserId = getUserId()

  function handleOpenChange(open: boolean) {
    if (open) {
      getUsers()
        .then((users) => {
          const options = users
            .filter((u) => Number(u.id) !== currentUserId)
            .map((u) => ({ label: `${u.nome} (ID: ${u.id})`, value: String(u.id) }))
          setUserOptions(options)
        })
        .catch(() => {})
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    if (currentUserId === null) {
      setError('User session not found. Please log in again.')
      setLoading(false)
      return
    }

    try {
      await sendTransaction({
        id_sender: currentUserId,
        id_receptor: Number(recipientId),
        valor: parseFloat(valor),
      })
      setSuccess(true)
      setRecipientId('')
      setValor('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Transfer failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-7 max-w-sm">
      <div>
        <h1 className="text-white text-2xl font-semibold">Send Transfer</h1>
        <p className="text-white/40 text-sm mt-1">Transfer funds to another account</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Recipient</label>
          <Select
            name="id_receptor"
            options={userOptions}
            placeholder="Select a recipient"
            onValueChange={setRecipientId}
            onOpenChange={handleOpenChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm pointer-events-none">$</span>
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
              className="w-full rounded border border-white/20 bg-transparent pl-7 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/50 transition-colors"
            />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {success && (
          <div className="flex items-center gap-2 text-sm text-contrast">
            <CheckCircleIcon size={16} weight="fill" />
            Transfer sent successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !recipientId}
          className="flex items-center justify-center gap-2 rounded py-2.5 text-sm font-semibold text-black bg-[#C9A84C] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <PaperPlaneTiltIcon size={16} weight="bold" />
          {loading ? 'Sending...' : 'Send Transfer'}
        </button>
      </form>
    </div>
  )
}
