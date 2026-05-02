import { http } from '@/services/http'
import type { User } from '@/types'

export type SeekerUser = Pick<User, 'id' | 'nome' | 'email'>

export function seekUsers(query: string) {
  return http<SeekerUser[]>(`/users/search?q=${encodeURIComponent(query)}`)
}
