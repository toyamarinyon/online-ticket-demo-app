import type { NextApiRequest, NextApiResponse } from 'next'
import Ajv, { JSONSchemaType } from 'ajv'
import prismaClient from 'lib/prisma/client'
import { getUserByRequest } from 'lib/auth/server/get-user'
import { ProfileFormValue } from 'lib/user/profile/type'

const requestSchema: JSONSchemaType<ProfileFormValue> = {
  type: 'object',
  properties: {
    username: { type: 'string' },
  },
  required: ['username'],
}
async function UpsertProfile(req: NextApiRequest, res: NextApiResponse) {
  const ajv = new Ajv({ coerceTypes: true })
  const validate = ajv.compile(requestSchema)
  if (!validate(req.body)) {
    res.status(400).send('')
    return
  }
  const { username } = req.body
  const user = await getUserByRequest(req)
  if (!user) {
    res.send(404)
    return
  }
  await prismaClient.profile.upsert({
    // @ts-ignore
    where: { userId: user.id },
    update: {
      username,
    },
    create: {
      username,
      userId: user.id,
    },
  })
  res.send(200)
}

export default UpsertProfile
