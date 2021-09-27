import admin from 'firebase-admin'

export function adminApp() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY || ''),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    })
  }
  return admin
}
