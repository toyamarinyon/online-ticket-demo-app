import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import { Layout } from 'components/layout'
import { WelcomePanel } from 'components/layout/welcome'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useBeginPasswordReset } from 'lib/auth/password-reset/action'
import { AuthInvalidEmailError, AuthUserNotFoundError } from 'lib/auth/errors'
import yup from 'lib/util/yup-config'
import { useAuthState } from 'lib/auth/state'
import { TextField } from 'components/form/field'
import { Panel } from 'components/layout/panel'

interface FormData {
  email: string
}
const schema = yup.object().shape({
  email: yup.string().required().label('メールアドレス'),
})

export default function BeginPasswordResetPage() {
  const router = useRouter()
  const { authenticated } = useAuthState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const { loading: sendingPasswordReset, beginPasswordReset } =
    useBeginPasswordReset()
  if (authenticated) {
    router.push('/')
    return null
  }

  return (
    <Layout isTitleHidden>
      <WelcomePanel>
        <Panel>
          <Box>
            <Center>
              <Heading
                as="h2"
                fontSize="md"
                fontWeight="normal"
                marginBottom={4}
              >
                パスワードの再設定手順をお送りいたします
              </Heading>
            </Center>
            <Text marginBottom={4}>メールアドレスを入力してください</Text>
            <form
              className="my-6"
              role="form"
              onSubmit={handleSubmit(async ({ email }) => {
                try {
                  await beginPasswordReset(email)
                  router.push('/account/sent-password-reset-instruction')
                } catch (error) {
                  if (error instanceof AuthUserNotFoundError) {
                    setError('email', {
                      type: 'pattern',
                      message:
                        'ご入力いただいたメールアドレスは登録されていません。参加登録をお願います。',
                    })
                  } else if (error instanceof AuthInvalidEmailError) {
                    setError('email', {
                      type: 'pattern',
                      message: 'メールアドレスの形式が正しくありません。',
                    })
                  } else {
                    setError('email', {
                      type: 'pattern',
                      message:
                        'システムに問題が発生しています。申し訳ありませんがしばらく経ってから再度お試しください。',
                    })
                  }
                }
              })}
            >
              <Box marginBottom={8}>
                <TextField
                  label="メールアドレス"
                  name="email"
                  register={register('email')}
                  errors={errors}
                  isRequired
                />
              </Box>
              <Button
                colorScheme="blue"
                type="submit"
                loading={sendingPasswordReset}
                isFullWidth
              >
                パスワードをリセットする
              </Button>
            </form>
          </Box>
        </Panel>
      </WelcomePanel>
    </Layout>
  )
}
