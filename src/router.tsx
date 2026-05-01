import { Routes, Route } from 'react-router'
import Register from './dashboard/register/register'
import Login from './dashboard/login/login'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
