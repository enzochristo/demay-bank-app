import type { FieldConfig } from '../types'
import { Select } from '@/components/Select/select'

interface FormSelectProps {
  field: FieldConfig
  className?: string
}

export function FormSelect({ field, className }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field.key} className="text-sm font-medium text-white">
        {field.label}
      </label>
      <Select
        name={field.key}
        options={field.options ?? []}
        placeholder={field.placeholder}
        required={field.required}
        className={className}
      />
    </div>
  )
}
