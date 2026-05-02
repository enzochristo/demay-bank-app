import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { CaretDownIcon } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence } from 'motion/react'
import type { NavGroup } from '@/components/Sidebar/types'

interface GroupItemProps {
  item: NavGroup
}

export function GroupItem({ item }: GroupItemProps) {
  const { pathname } = useLocation()
  const isActive = item.children.some((c) => pathname.startsWith(c.href))
  const [open, setOpen] = useState(isActive)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={twMerge(
          'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
          isActive ? 'text-contrast' : 'text-white/50 hover:text-white',
        )}
      >
        <span>{item.icon}</span>
        <span className="flex-1 text-left">{item.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex items-center"
        >
          <CaretDownIcon size={13} weight="bold" className="text-white/30" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3 pb-1">
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  to={child.href}
                  className={({ isActive }) =>
                    twMerge(
                      'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                      isActive ? 'text-contrast font-medium' : 'text-white/50 hover:text-white',
                    )
                  }
                >
                  {child.icon}
                  {child.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
