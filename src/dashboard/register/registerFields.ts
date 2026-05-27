import type { FieldConfig } from '@/components/Form/types'

export const registerFields: FieldConfig[] = [
  {
    type: 'text',
    key: 'name',
    label: 'Full name',
    placeholder: 'John Doe',
    required: true,
  },
  {
    type: 'email',
    key: 'email',
    label: 'E-mail',
    placeholder: 'john@email.com',
    required: true,
  },
  {
    type: 'password',
    key: 'password',
    label: 'Password',
    placeholder: '••••••••',
    required: true,
  },
]
