import {
  HouseIcon,
  ArrowsLeftRightIcon,
  PaperPlaneTiltIcon,
  CurrencyDollarIcon,
  ListIcon,
  PlusIcon,
} from '@phosphor-icons/react'
import type { NavItem } from './types'

export const navItems: NavItem[] = [
  {
    kind: 'link',
    label: 'Dashboard',
    href: '/app/dashboard',
    icon: <HouseIcon size={18} weight="fill" />,
  },
  {
    kind: 'group',
    label: 'Transactions',
    icon: <ArrowsLeftRightIcon size={18} weight="bold" />,
    children: [
      {
        label: 'Send Transfer',
        href: '/app/transactions',
        icon: <PaperPlaneTiltIcon size={16} weight="bold" />,
      },
    ],
  },
  {
    kind: 'group',
    label: 'Loans',
    icon: <CurrencyDollarIcon size={18} weight="bold" />,
    children: [
      {
        label: 'My Loans',
        href: '/app/loans',
        icon: <ListIcon size={16} weight="bold" />,
      },
      {
        label: 'Apply for Loan',
        href: '/app/loans/apply',
        icon: <PlusIcon size={16} weight="bold" />,
      },
    ],
  },
]
