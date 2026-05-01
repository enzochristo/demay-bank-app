import { twMerge } from 'tailwind-merge'
import {
  Select as SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SelectOption } from '@/components/Form/types'

interface SelectProps {
  name: string
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  className?: string
}

export function Select({ name, options, placeholder, required, className }: SelectProps) {
  return (
    <SelectRoot name={name} required={required}>
      <SelectTrigger className={twMerge('w-full h-auto py-2 border border-white/20 rounded-sm bg-transparent text-white', className)}>
        <SelectValue placeholder={placeholder ?? 'Selecione...'} />
      </SelectTrigger>
      <SelectContent position="popper" className="bg-secondary text-white rounded-sm">
        <SelectGroup>
          {options.map((option, index) => (
            <>
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white focus:bg-primary focus:text-white **:text-white"
              >
                {option.label}
              </SelectItem>
              {index < options.length - 1 && (
                <SelectSeparator key={`sep-${index}`} className="bg-white/20" />
              )}
            </>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  )
}
