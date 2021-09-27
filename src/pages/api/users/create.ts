import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from 'lib/prisma/client'
import { createUser } from 'lib/firebase/admin/auth'

async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  try {
    const user = await createUser(email, password)
    await prismaClient.user.create({
      data: {
        email,
        firebaseUserId: user.uid,
      },
    })
    res.send(200)
  } catch (error) {
    console.log(JSON.stringify(error))
    res.status(400).json({ error })
  }
}

export default CreateUser
