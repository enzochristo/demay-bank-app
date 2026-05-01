import { twMerge } from 'tailwind-merge'
import type { FieldConfig } from '../types'

interface FormInputProps {
  field: FieldConfig
  className?: string
}

export function FormInput({ field, className }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field.key} className="text-sm font-medium text-white">
        {field.label}
      </label>
      <input
        id={field.key}
        name={field.key}
        type={field.type}
        placeholder={field.placeholder}
        required={field.required}
        className={twMerge('border border-white/20 rounded-sm bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-low-contrast focus:ring-2 focus:ring-low-contrast/40', className)}
      />
    </div>
  )
}
