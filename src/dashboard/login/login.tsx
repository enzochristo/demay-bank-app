import { Card } from '@/components/Card/card'
import { DynamicForm } from '@/components/Form/DynamicForm'
import { Header } from '@/components/Header/header'
import { loginFields } from './loginFields'

export default function Login() {
  function handleSubmit(data: Record<string, string>) {
    console.log(data)
    // api.post('/login', data)
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center pb-24">
        <Card className="w-full max-w-sm p-8 flex flex-col gap-6 bg-primary" title="Sign in" description="Enter your credentials to access your account">
          <DynamicForm fields={loginFields} onSubmit={handleSubmit} />
        </Card>
      </div>
    </div>
  )
}
