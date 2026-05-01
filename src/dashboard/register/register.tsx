import { Card } from '@/components/Card/card'
import { DynamicForm } from '@/components/Form/DynamicForm'
import { Header } from '@/components/Header/header'
import { registerFields } from './registerFields'

export default function Register() {
  function handleSubmit(data: Record<string, string>) {
    console.log(data)
    // api.post('/register', data)
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center pb-24">
        <Card className="w-full max-w-sm p-8 flex flex-col gap-6 bg-primary" title="Create account" description="Fill in your details below">
          <DynamicForm fields={registerFields} onSubmit={handleSubmit} />
        </Card>
      </div>
    </div>
  )
}
