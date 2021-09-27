import { initializeApp, getApps } from 'firebase/app'
export function firebaseApp() {
  const apps = getApps()
  if (apps.length > 0) {
    return apps[0]
  }
  return initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
}
