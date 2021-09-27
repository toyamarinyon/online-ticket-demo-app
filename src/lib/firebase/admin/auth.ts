import { BaseError } from 'lib/util/errors/base-error'
import { adminApp } from 'lib/firebase/admin/app'
import type { NextApiRequest } from 'next'
export function adminAuth() {
  return adminApp().auth()
}

export class MissingBearerError extends BaseError {}

export async function verifyIdToken(req: NextApiRequest) {
  const bearerHeader = req.headers['authorization']

  if (!bearerHeader) {
    throw new MissingBearerError()
  }
  const bearer = bearerHeader.split(' ')
  const bearerToken = bearer[1]
  return await adminAuth().verifyIdToken(bearerToken)
}

export async function createUser(email: string, password: string) {
  return await adminAuth().createUser({ email, password })
}

export async function upsertUser(email: string, password: string) {
  try {
    const firebaseUser = await adminApp().auth().createUser({
      email,
      password,
    })
    return firebaseUser.uid
  } catch (error) {
    const firebaseUser = await adminApp().auth().getUserByEmail(email)
    adminApp().auth().updateUser(firebaseUser.uid, { password })
    return firebaseUser.uid
  }
}

export async function getClaims(uid: string) {
  const user = await adminApp().auth().getUser(uid)
  return user.customClaims
}
