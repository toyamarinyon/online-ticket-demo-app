import { useState } from 'react'
import { User } from 'firebase/auth'
import { ProfileFormValue } from './type'
import { createCheckout } from 'lib/stripe/checkout'

export function useProfileAction() {
  const [processing, setProcessing] = useState(false)
  async function upsertProfile(user: User, profile: ProfileFormValue) {
    setProcessing(true)
    const idToken = await user.getIdToken()
    await fetch('/api/user/profile/upsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${idToken}`,
      },
      body: JSON.stringify(profile),
    })
    await createCheckout(idToken)
  }
  return { processing, upsertProfile }
}
