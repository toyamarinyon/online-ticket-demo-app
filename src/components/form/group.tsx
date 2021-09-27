import { Heading, VStack, Text, Box } from '@chakra-ui/react'
interface FormGroupProps {
  title?: string
  description?: string
  children: React.ReactNode
}
export function FormGroup({ children, title, description }: FormGroupProps) {
  return (
    <Box w="full">
      <Box marginBottom={2}>
        {title && (
          <Heading as="h2" fontSize="xl" marginBottom="2">
            {title}
          </Heading>
        )}
        {description && <Text fontSize="sm">{description}</Text>}
      </Box>
      <VStack marginBottom={8} spacing={8} width="full">
        {children}
      </VStack>
    </Box>
  )
}
