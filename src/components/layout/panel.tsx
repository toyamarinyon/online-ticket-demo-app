import { VStack, StackDivider, useColorModeValue } from '@chakra-ui/react'
interface PanelProps {
  children: React.ReactNode
  borderColor?: string
}
export function Panel({ children }: PanelProps) {
  const bg = useColorModeValue('white', 'blue.900')
  const borderColor = useColorModeValue('blue.500', 'blue.900')

  return (
    <VStack
      spacing={8}
      border="1px"
      borderColor={borderColor}
      backgroundColor={bg}
      rounded="sm"
      py={12}
      px={[6, 12]}
      divider={<StackDivider borderColor="blue.200" />}
    >
      {children}
    </VStack>
  )
}
