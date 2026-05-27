const BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const TRANSACTIONS_BASE_URL = (import.meta.env.VITE_TRANSACTIONS_API_URL ?? '').replace(/\/$/, '')

async function readErrorMessage(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    try {
      const body = await response.json() as { message?: string; error?: string }
      return body.message ?? body.error ?? `${response.status} ${response.statusText}`
    } catch {
      return `${response.status} ${response.statusText}`
    }
  }

  try {
    const body = await response.text()
    return body.trim() || `${response.status} ${response.statusText}`
  } catch {
    return `${response.status} ${response.statusText}`
  }
}

function buildHeaders() {
  return {
    'Content-Type': 'application/json',
  }
}

async function request<T>(baseUrl: string, path: string, init?: RequestInit): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const res = await fetch(`${baseUrl}${normalizedPath}`, { headers: buildHeaders(), ...init })

  if (!res.ok) {
    throw new Error(await readErrorMessage(res))
  }

  if (res.status === 204) {
    return undefined as T
  }

  return res.json() as Promise<T>
}

export function http<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(BASE_URL, path, init)
}

export function httpTransactions<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(TRANSACTIONS_BASE_URL, path, init)
}
