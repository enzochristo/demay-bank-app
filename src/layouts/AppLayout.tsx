import { Outlet } from 'react-router'
import { Sidebar } from '@/components/Sidebar/Sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-primary">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
