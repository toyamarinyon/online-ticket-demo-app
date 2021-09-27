import { Button, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSignUpAction } from 'lib/auth/sign-up/action'
import { AuthFormData, schema } from '../util/form'
import {
  AuthEmailAlreadyExistsError,
  AuthInvalidEmailError,
  AuthInvalidPasswordError,
} from '../errors'
import { TextField } from 'components/form/field'

export interface SignUpFormProps {}

export function SignUpForm({}: SignUpFormProps) {
  const { processing, signUp } = useSignUpAction()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
  })
  return (
    <form
      data-testid="sign-up-form"
      onSubmit={handleSubmit(async ({ email, password }) => {
        try {
          await signUp(email, password)
        } catch (e) {
          if (e instanceof AuthInvalidEmailError) {
            setError('email', {
              type: 'pattern',
              message: 'Email is invalid. It must be a string email address.',
            })
          }
          if (e instanceof AuthEmailAlreadyExistsError) {
            setError('email', {
              type: 'pattern',
              message: 'Email in use by an existing user.',
            })
          }
          if (e instanceof AuthInvalidPasswordError) {
            setError('password', {
              type: 'pattern',
              message:
                'Password is invalid. It must be a string with at least six characters.',
            })
          }
        }
      })}
    >
      <VStack spacing={4} marginBottom={10}>
        <TextField
          name="email"
          label="Email"
          errors={errors}
          register={register('email')}
          isRequired
        />
        <TextField
          name="password"
          label="Password"
          errors={errors}
          register={register('password')}
          isRequired
        />
      </VStack>
      <Button
        type="submit"
        colorScheme="blue"
        isFullWidth
        isLoading={processing}
      >
        Next
      </Button>
    </form>
  )
}
