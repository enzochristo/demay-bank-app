export interface NavChild {
  label: string
  href: string
  icon: React.ReactNode
}

export interface NavLink {
  kind: 'link'
  label: string
  href: string
  icon: React.ReactNode
}

export interface NavGroup {
  kind: 'group'
  label: string
  icon: React.ReactNode
  children: NavChild[]
}

export type NavItem = NavLink | NavGroup
