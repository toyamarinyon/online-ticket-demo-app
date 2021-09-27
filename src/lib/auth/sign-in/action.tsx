import { useState } from 'react'
import { signIn as signInToFirebase } from 'lib/firebase/web/auth'
import {
  AuthInvalidEmailError,
  AuthUnhandledError,
  AuthUserDisabledError,
  AuthUserNotFoundError,
  AuthWrongPasswordError,
} from '../errors'
import { FirebaseError } from 'firebase/app'

export function useSignInAction() {
  const [processing, setProcessing] = useState(false)
  async function signIn(email: string, password: string) {
    setProcessing(true)
    try {
      const userCredential = await signInToFirebase(email, password)
      if (!userCredential.user) {
        throw new AuthUnhandledError()
      }
      setProcessing(false)
      return userCredential.user
    } catch (error) {
      setProcessing(false)
      if (error instanceof FirebaseError) {
        if (!error.code) {
          throw new AuthUnhandledError(error.toString())
        }
        const { code } = error
        if (code === 'auth/user-not-found') {
          throw new AuthUserNotFoundError()
        } else if (code === 'auth/invalid-email') {
          throw new AuthInvalidEmailError()
        } else if (code === 'auth/user-disabled') {
          throw new AuthUserDisabledError()
        } else if (code === 'auth/wrong-password') {
          throw new AuthWrongPasswordError()
        } else {
          throw new AuthUnhandledError(error.toString())
        }
      }
    }
  }
  return { processing, signIn }
}
