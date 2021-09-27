import { signOut as firebaseSignOut } from 'lib/firebase/web/auth'
import { useState } from 'react'

export function useSignOutAction() {
  const [processing, setProcessing] = useState(false)
  async function signOut() {
    setProcessing(true)
    await firebaseSignOut()
  }
  return { processing, signOut }
}
