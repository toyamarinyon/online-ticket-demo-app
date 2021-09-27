import { User } from 'firebase/auth'
import { selector, useRecoilValue } from 'recoil'
import { firebaseAuthState, useFirebaseAuthState } from 'lib/firebase/web/auth'

type Authenticated = {
  authenticated: true
  user: User
}
type Unauthenticated = {
  authenticated: false
  readonly user: undefined
}
export type AuthState = Authenticated | Unauthenticated

export const authState = selector<AuthState>({
  key: 'authState',
  dangerouslyAllowMutability: true,
  get: ({ get }) => {
    const firebaseAuth = get(firebaseAuthState)
    if (firebaseAuth.authenticated) {
      return {
        authenticated: true,
        user: firebaseAuth.user!,
      }
    } else {
      return {
        authenticated: false,
      }
    }
  },
})

export function loadAuthState() {
  const { loading, error } = useFirebaseAuthState()
  return { loading, error }
}

export function useAuthState() {
  return useRecoilValue(authState)
}
