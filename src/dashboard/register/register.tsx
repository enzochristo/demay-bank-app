import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card } from '@/components/Card/card'
import { DynamicForm } from '@/components/Form/DynamicForm'
import { Header } from '@/components/Header/header'
import { http } from '@/services/http'
import { registerFields } from './registerFields'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(data: Record<string, string>) {
    setLoading(true)
    setError(null)

    try {
      await http('/user/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center pb-24">
        <Card className="w-full max-w-sm p-8 flex flex-col gap-6 bg-primary" title="Create account" description="Fill in your details below">
          <DynamicForm
            fields={registerFields}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            submitLabel="Create account"
            submittingLabel="Creating..."
          />

          {error && <p className="text-sm text-destructive">{error}</p>}
        </Card>
      </div>
    </div>
  )
}
