import type { NextApiRequest } from 'next'
import { getClaims, verifyIdToken } from 'lib/firebase/admin/auth'
import prismaClient from 'lib/prisma/client'
import { User } from '@prisma/client'
export async function getUserByRequest(req: NextApiRequest) {
  const decodedIdToken = await verifyIdToken(req)
  const user = await prismaClient.user.findFirst({
    where: {
      firebaseUserId: decodedIdToken.uid,
    },
  })
  return user
}

export async function isAuthorized({
  user,
  hasRole,
}: {
  user: User
  hasRole: Array<'tester'>
}) {
  const claims = await getClaims(user.firebaseUserId)
  if (!claims || !claims.role) {
    return false
  }
  return hasRole.some((role) => claims.role === role)
}
