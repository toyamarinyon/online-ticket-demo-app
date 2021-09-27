import { Profile } from '@prisma/client'
import { AuthState } from 'lib/auth/state'
import { useEffect, useState } from 'react'

interface CurrentUserResponse {
  isPaid: boolean
  hasProfile: boolean
  showButton: boolean
  profile: Profile
}

export function useUserState(authState: AuthState) {
  const [loading, setLoading] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [profile, setProfile] = useState<Profile>()
  useEffect(() => {
    if (!authState.authenticated) {
      return
    }
    setLoading(true)
    authState.user.getIdToken().then((idToken) => {
      fetch('/api/current-user', {
        headers: {
          Authorization: `Bearer: ${idToken}`,
        },
      })
        .then((res) => res.json())
        .then((json) => json as CurrentUserResponse)
        .then((currentUser) => {
          setLoading(false)
          setHasProfile(currentUser.hasProfile)
          setIsPaid(currentUser.isPaid)
          setShowButton(currentUser.showButton)
          setProfile(currentUser.profile)
        })
    })
  }, [authState])
  return { loading, hasProfile, profile, isPaid, showButton }
}
