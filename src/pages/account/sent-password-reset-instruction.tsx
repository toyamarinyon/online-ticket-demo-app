import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Layout } from 'components/layout'
import { WelcomePanel } from 'components/layout/welcome'
import { Link, Text } from '@chakra-ui/react'
import { useAuthState } from 'lib/auth/state'

export default function SentPasswordResetInstruction() {
  const router = useRouter()
  const { authenticated } = useAuthState()

  if (authenticated) {
    router.push('/')
    return null
  }
  return (
    <Layout isTitleHidden>
      <WelcomePanel>
        <Text marginBottom={8}>
          入力いただいたメールアドレスにパスワード再設定の手順をお送りしました。メールボックスをご確認ください。
        </Text>
        <NextLink href="/" passHref>
          <Link color="blue.500">トップページに戻る</Link>
        </NextLink>
      </WelcomePanel>
    </Layout>
  )
}
