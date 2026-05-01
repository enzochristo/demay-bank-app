import type { FieldConfig } from '@/components/Form/types'

export const loginFields: FieldConfig[] = [
  {
    type: 'email',
    key: 'email',
    label: 'Email',
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
