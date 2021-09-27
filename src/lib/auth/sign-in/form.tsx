import NextLink from 'next/link'
import { useSignInAction } from 'lib/auth/sign-in/action'
import { useForm } from 'react-hook-form'
import {
  Button,
  Center,
  Link,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthFormData, schema } from '../util/form'
import {
  AuthInvalidEmailError,
  AuthUserDisabledError,
  AuthUserNotFoundError,
  AuthWrongPasswordError,
} from '../errors'
import { TextField } from 'components/form/field'
export interface SignInFormProps {
  buttonLabel: string
}

export function SignInForm({ buttonLabel }: SignInFormProps) {
  const { processing, signIn } = useSignInAction()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
  })
  return (
    <VStack spacing={8}>
      <form
        style={{ width: '100%' }}
        data-testid="sign-in-form"
        onSubmit={handleSubmit(async ({ email, password }) => {
          try {
            await signIn(email, password)
          } catch (error) {
            if (error instanceof AuthInvalidEmailError) {
              setError('email', {
                type: 'pattern',
                message: 'メールアドレスの形式が正しくありません。',
              })
            } else if (error instanceof AuthUserDisabledError) {
              setError('email', {
                type: 'pattern',
                message:
                  '現在アカウントを停止させていただいています。事務局にお問い合わせください。',
              })
            } else if (error instanceof AuthUserNotFoundError) {
              setError('email', {
                type: 'pattern',
                message: 'このメールアドレスは登録されていません',
              })
            } else if (error instanceof AuthWrongPasswordError) {
              setError('email', {
                type: 'pattern',
                message: 'パスワードが正しくありません',
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
          {buttonLabel}
        </Button>
      </form>
      <Center>
        <NextLink href="/account/begin-password-reset" passHref>
          <Link as="a">
            Forgot Password?
          </Link>
        </NextLink>
      </Center>
    </VStack>
  )
}
