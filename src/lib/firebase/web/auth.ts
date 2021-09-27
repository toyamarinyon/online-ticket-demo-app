import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  initializeAuth,
  User,
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { firebaseApp } from './app'
import { atom, useRecoilState } from 'recoil'

export async function signUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(firebaseAuth(), email, password)
}

export async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(firebaseAuth(), email, password)
}

export function firebaseAuth() {
  let auth = getAuth(firebaseApp())
  if (!auth) {
    auth = initializeAuth(firebaseApp())
  }
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR && !auth.emulatorConfig) {
    connectAuthEmulator(auth, 'http://localhost:9012', {
      disableWarnings: true
    })
  }
  return auth
}
export async function signOut() {
  return await firebaseAuth().signOut()
}
export async function beginPasswordReset(email: string) {
  const { protocol, host } = location
  await sendPasswordResetEmail(firebaseAuth(), email, {
    url: `${protocol}//${host}`,
  })
}

interface FirebaseAuthState {
  authenticated: boolean
  user: User | null | undefined
  loading: boolean
}
export const firebaseAuthState = atom<FirebaseAuthState>({
  key: 'firebaseAuthState',
  default: {
    authenticated: false,
    user: null,
    loading: true,
  },
  dangerouslyAllowMutability: true,
})

export function useFirebaseAuthState() {
  const [{ loading }, setFirebaseAuthState] = useRecoilState(firebaseAuthState)
  const [error, setError] = useState<Error>()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth(),
      (user) => {
        setFirebaseAuthState({
          user,
          authenticated: user !== undefined && user !== null,
          loading: false,
        })
      },
      (error) => setError(error)
    )
    return () => unsubscribe()
  }, [])
  return { loading, error }
}
