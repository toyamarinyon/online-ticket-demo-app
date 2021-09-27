import NextLink from 'next/link'
import {
  Alert,
  AlertIcon,
  Heading,
  Box,
  Button,
  Center,
  Text,
  Icon,
  HStack,
  VStack,
  Spinner,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { WelcomePanel } from 'components/layout/welcome'
import { SignInForm } from 'lib/auth/sign-in/form'
import { Panel } from 'components/layout/panel'
import { useAuthState } from 'lib/auth/state'
import { useUserState } from 'lib/user/state'
import { ProfileForm } from 'lib/user/profile/form'
import { PurchaseForm } from 'lib/token/form'
import { Layout } from 'components/layout'

export default function Home() {
  const authState = useAuthState()
  const { loading, hasProfile, isPaid, showButton } = useUserState(authState)
  return (
    <Layout isTitleHidden>
      <WelcomePanel>
        {authState.authenticated ? (
          <>
            {loading ? (
              <Center>
                <Box px={8} py={3} rounded="full">
                  <HStack spacing={4}>
                    <Spinner />
                    <Text>Loading...</Text>
                  </HStack>
                </Box>
              </Center>
            ) : (
              <>
                {isPaid ? (
                  <>
                    <Alert status="success" rounded="sm" marginBottom={4}>
                      <AlertIcon />
                      Registration is complete.
                    </Alert>
                    {showButton ? (
                      <Button colorScheme="blue" variant="link">
                        <Text>Watch the live stream</Text>
                        <Icon as={ArrowRightIcon} marginLeft={2} />
                      </Button>
                    ) : (
                      <VStack alignItems="flex-start">
                        <Text>
                          A button to watch the live streaming will be displayed
                          here on the day of the event.
                        </Text>
                        <Text>
                          You can download the certificate from this page after
                          the day of the event.
                        </Text>
                      </VStack>
                    )}
                  </>
                ) : (
                  <>
                    <Alert status="warning" rounded="sm" marginBottom={4}>
                      <AlertIcon />
                      Registration is not yet complete.
                    </Alert>
                    <Panel>
                      {hasProfile ? (
                        <PurchaseForm user={authState.user} />
                      ) : (
                        <ProfileForm
                          user={authState.user}
                          onRegisterProfile={() => {}}
                        />
                      )}
                    </Panel>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Panel>
            <Box w="full">
              <Center>
                <Heading
                  as="h2"
                  fontSize="md"
                  fontWeight="normal"
                  marginBottom={4}
                >
                  Sign Up and payment are required to participate.
                </Heading>
              </Center>
              <NextLink href="/sign-up" passHref>
                <Button colorScheme="blue" as="a" isFullWidth>
                  Sign Up and pay for your account.
                </Button>
              </NextLink>
            </Box>
            <Box>
              <Heading
                as="h2"
                fontSize="md"
                fontWeight="normal"
                marginBottom={4}
              >
                If you have already registered, please login.
              </Heading>
              <SignInForm buttonLabel="Log In" />
            </Box>
          </Panel>
        )}
      </WelcomePanel>
    </Layout>
  )
}
