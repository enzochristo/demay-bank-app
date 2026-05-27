import type { FieldConfig } from './types'
import { FormInput } from './fields/FormInput'
import { FormSelect } from './fields/FormSelect'

interface DynamicFormProps {
  fields: FieldConfig[]
  onSubmit: (data: Record<string, string>) => void | Promise<void>
  submitLabel?: string
  submittingLabel?: string
  isSubmitting?: boolean
}

export function DynamicForm({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  submittingLabel = 'Submitting...',
  isSubmitting = false,
}: DynamicFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    void onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map(field =>
        field.type === 'select'
          ? <FormSelect key={field.key} field={field} />
          : <FormInput key={field.key} field={field} />
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-sm px-4 py-2 text-sm font-medium bg-low-contrast/80 text-white hover:brightness-125 transition-all disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </form>
  )
}
