import type { FieldConfig } from './types'
import { FormInput } from './fields/FormInput'
import { FormSelect } from './fields/FormSelect'

interface DynamicFormProps {
  fields: FieldConfig[]
  onSubmit: (data: Record<string, string>) => void
}

export function DynamicForm({ fields, onSubmit }: DynamicFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map(field =>
        field.type === 'select'
          ? <FormSelect key={field.key} field={field} />
          : <FormInput key={field.key} field={field} />
      )}
      <button type="submit" className="mt-2 rounded-sm px-4 py-2 text-sm font-medium bg-low-contrast/80 text-white hover:brightness-125 transition-all">
        Submmit
      </button>
    </form>
  )
}
