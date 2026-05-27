import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card } from '@/components/Card/card'
import { DynamicForm } from '@/components/Form/DynamicForm'
import { Header } from '@/components/Header/header'
import { http } from '@/services/http'
import { saveUserId } from '@/services/auth'
import { loginFields } from './loginFields'

interface LoginResponse {
  id: number
  name?: string
  email?: string
}

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(data: Record<string, string>) {
    setLoading(true)
    setError(null)

    try {
      const res = await http<LoginResponse>('/user/login', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      saveUserId(res.id)
      navigate('/app/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center pb-24">
        <Card className="w-full max-w-sm p-8 flex flex-col gap-6 bg-primary" title="Sign in" description="Enter your credentials to access your account">
          <DynamicForm
            fields={loginFields}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            submitLabel="Sign in"
            submittingLabel="Signing in..."
          />

          {error && <p className="text-sm text-destructive">{error}</p>}
        </Card>
      </div>
    </div>
  )
}
