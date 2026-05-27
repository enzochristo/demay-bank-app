import { http } from './http'
import type { User } from '@/types'

export function getUsers() {
  return http<User[]>('/user')
}
