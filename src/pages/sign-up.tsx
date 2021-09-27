import { WelcomePanel } from 'components/layout/welcome'
import { Heading, Box, Center } from '@chakra-ui/react'
import { SignUpForm } from 'lib/auth/sign-up/form'
import { Panel } from 'components/layout/panel'
import { useAuthState } from 'lib/auth/state'
import { useRouter } from 'next/dist/client/router'
import { Layout } from 'components/layout'

export default function SignUpPage() {
  const { authenticated } = useAuthState()
  const router = useRouter()
  if (authenticated) {
    router.push('/')
  }
  return (
    <Layout isTitleHidden>
      <WelcomePanel>
        <Panel>
          <Box w="full">
            <Center>
              <Heading
                as="h2"
                fontSize="md"
                fontWeight="normal"
                marginBottom={4}
              >
                Sign Up
              </Heading>
            </Center>
            <SignUpForm />
          </Box>
        </Panel>
      </WelcomePanel>
    </Layout>
  )
}
