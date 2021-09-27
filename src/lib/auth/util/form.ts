import yup from 'lib/util/yup-config'
export interface AuthFormData {
  email: string
  password: string
}

export const schema = yup.object().shape({
  email: yup.string().required().label('Email'),
  password: yup.string().required().label('Password'),
})
