import {
  Heading,
  Box,
  Text,
  HStack,
  VStack,
  Stack,
  StackDivider,
} from '@chakra-ui/react'

interface WelcomePanelProps {
  children: React.ReactNode
}
export function WelcomePanel({ children }: WelcomePanelProps) {
  return (
    <Stack direction={['column', 'row']} spacing={12}>
      <Box w={['100%', '50%']}>
        <Heading
          as="h1"
          lineHeight={[8, '48px']}
          letterSpacing="wider"
          marginBottom={8}
        >
          The first Next.js Testing conference(DEMO)
        </Heading>
        <Box fontSize={['xl']} lineHeight={1}>
          <VStack spacing={8} alignItems="flex-start">
            <Box>
              <HStack
                align="baseline"
                fontWeight="bold"
                lineHeight={1}
                marginBottom={2}
              >
                <Text fontSize={['3xl', '3xl']}>October 27, 2021</Text>
                <Text fontSize="xl">(Sat.)</Text>
              </HStack>
            </Box>
            <HStack divider={<StackDivider />}>
              <Text>ONLINE</Text>
              <Text>$10</Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
      <Box flex={1}>{children}</Box>
    </Stack>
  )
}
