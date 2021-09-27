import { Profile } from '@prisma/client'
export type ProfileFormValue = Omit<Profile, 'id' | 'userId' |'createdAt'>
