import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from 'lib/prisma/client'
import { getUserByRequest, isAuthorized } from 'lib/auth/server/get-user'
import config from 'config.json'

async function currentUser(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserByRequest(req)
  if (!user) {
    res.send(404)
    return
  }
  const order = await prismaClient.order.findFirst({
    where: {
      userId: user.id,
    },
  })
  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: user.id,
    },
  })
  const showButton =
    new Date().getTime() > Date.parse(config.liveButton.scheduledAt) ||
    (await isAuthorized({ user, hasRole: ['tester'] }))

  res.json({
    isPaid: order !== null,
    hasProfile: profile !== null,
    showButton,
    profile,
  })
}

export default currentUser
