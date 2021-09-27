import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'styles/theme'
import { AuthContainer } from 'lib/auth/container'
import { RecoilRoot } from 'recoil'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <AuthContainer>
          <Component {...pageProps} />
        </AuthContainer>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default App
