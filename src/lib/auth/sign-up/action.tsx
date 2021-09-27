import { useState } from 'react'
import { signIn } from 'lib/firebase/web/auth'
import {
  AuthEmailAlreadyExistsError,
  AuthInvalidEmailError,
  AuthInvalidPasswordError,
  AuthUnhandledError,
} from '../errors'
import { FirebaseError } from 'firebase/app'

export function useSignUpAction() {
  const [processing, setProcessing] = useState(false)
  async function signUp(email: string, password: string) {
    setProcessing(true)
    const res = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (res.status === 400) {
      setProcessing(false)
      const json = await res.json()
      const error = json.error
      if (!error || !error.code) {
        throw new AuthUnhandledError(error.toString())
      }
      const { code } = error
      if (code === 'auth/email-already-exists') {
        throw new AuthEmailAlreadyExistsError()
      } else if (code === 'auth/invalid-email') {
        throw new AuthInvalidEmailError()
      } else if (code === 'auth/invalid-password') {
        throw new AuthInvalidPasswordError()
      } else {
        throw new AuthUnhandledError(error.toString())
      }
    }
    await signIn(email, password)
  }
  return { processing, signUp }
}
