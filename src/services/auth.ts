const SESSION_KEY = 'userId'

export function saveUserId(id: number) {
  localStorage.setItem(SESSION_KEY, String(id))
}

export function getUserId(): number | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}

export function clearUserId() {
  localStorage.removeItem(SESSION_KEY)
}
