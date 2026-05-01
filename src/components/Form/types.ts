export type FieldType = 'text' | 'email' | 'password' | 'select'

export interface SelectOption {
  label: string
  value: string
}

export interface FieldConfig {
  type: FieldType
  key: string
  label: string
  placeholder?: string
  required?: boolean
  options?: SelectOption[]
}
