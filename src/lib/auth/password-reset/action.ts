import { FirebaseError } from 'firebase/app'
import { beginPasswordReset as beginFirebasePasswordReset } from 'lib/firebase/web/auth'
import { useState } from 'react'
import {
  AuthInvalidContinueUriError,
  AuthInvalidEmailError,
  AuthMissingContinueUriError,
  AuthUnauthorizedContinueUriError,
  AuthUnhandledError,
  AuthUserNotFoundError,
} from '../errors'

export async function beginPasswordReset(email: string) {
  return await beginFirebasePasswordReset(email)
}

export function useBeginPasswordReset() {
  const [loading, setLoading] = useState(false)
  async function beginPasswordReset(email: string) {
    setLoading(true)
    try {
      await beginFirebasePasswordReset(email)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error instanceof FirebaseError) {
        if (!error.code) {
          throw new AuthUnhandledError(error.toString())
        }
        const { code } = error
        if (code === 'auth/invalid-email') {
          throw new AuthInvalidEmailError()
        } else if (code === 'auth/missing-continue-uri') {
          throw new AuthMissingContinueUriError()
        } else if (code === 'auth/invalid-continue-uri') {
          throw new AuthInvalidContinueUriError()
        } else if (code === 'auth/unauthorized-continue-uri') {
          throw new AuthUnauthorizedContinueUriError()
        } else if (code === 'auth/user-not-found') {
          throw new AuthUserNotFoundError()
        } else {
          throw new AuthUnhandledError(error.toString())
        }
      }
    }
  }
  return { loading, beginPasswordReset }
}
