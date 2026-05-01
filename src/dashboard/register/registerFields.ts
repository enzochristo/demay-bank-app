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
    type: 'text',
    key: 'cpf',
    label: 'CPF',
    placeholder: '000.000.000-00',
    required: true,
  },
  {
    type: 'select',
    key: 'accountType',
    label: 'Account type',
    placeholder: 'Select account type',
    required: true,
    options: [
      { label: 'Checking account', value: 'checking' },
      { label: 'Savings account', value: 'savings' },
    ],
  },
  {
    type: 'password',
    key: 'password',
    label: 'Password',
    placeholder: '••••••••',
    required: true,
  },
]
