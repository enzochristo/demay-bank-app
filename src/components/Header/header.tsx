import { CloudIcon } from '@phosphor-icons/react'

export function Header() {
  return (
    <header className="w-full flex items-center gap-3 px-8 py-4 bg-primary">
      <CloudIcon size={28} weight="fill" className="text-contrast" />
      <span className="text-white text-lg font-semibold">Demay Bank</span>
    </header>
  )
}
