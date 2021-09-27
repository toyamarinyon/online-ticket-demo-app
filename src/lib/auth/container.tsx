import { loadAuthState } from './state'

export function AuthContainer({ children }: { children: React.ReactNode }) {
  const { loading, error } = loadAuthState()
  if (loading) {
    return null
  }
  if (error) {
    throw error
  }
  return <>{children}</>
}
