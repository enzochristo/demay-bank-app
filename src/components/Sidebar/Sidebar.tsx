import { NavLink } from 'react-router'
import { CloudIcon } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'
import { GroupItem } from '@/components/GroupItem/GroupItem'
import { navItems } from './nav'

export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 flex flex-col bg-secondary border-r border-white/10 min-h-screen">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <CloudIcon size={22} weight="fill" className="text-contrast" />
        <span className="text-white font-semibold text-base">Demay Bank</span>
      </div>

      <nav className="flex flex-col gap-0.5 p-3 flex-1">
        {navItems.map((item) =>
          item.kind === 'link' ? (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                twMerge(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'text-contrast'
                    : 'text-white/50 hover:text-white',
                )
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ) : (
            <GroupItem key={item.label} item={item} />
          ),
        )}
      </nav>
    </aside>
  )
}
