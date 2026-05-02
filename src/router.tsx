import { Routes, Route, Navigate } from 'react-router'
import Register from './dashboard/register/register'
import Login from './dashboard/login/login'
import { AppLayout } from './layouts/AppLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Transactions from './pages/Transactions/Transactions'
import Loans from './pages/Loans/Loans'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="loans" element={<Loans />} />
        <Route path="loans/apply" element={<Loans />} />
      </Route>
    </Routes>
  )
}
