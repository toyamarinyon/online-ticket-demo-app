import { useState } from 'react'
import { User } from 'firebase/auth'
import { Button, Center, Heading, Text } from '@chakra-ui/react'
import { createCheckout } from 'lib/stripe/checkout'
interface PurchaseFormProps {
  user: User
}
export function PurchaseForm({ user }: PurchaseFormProps) {
  const [purchasing, setPurchasing] = useState(false)
  return (
    <>
      <Center>
        <Heading as="h2" fontSize="md" fontWeight="normal" marginBottom={4}>
          Click on the button below to purchase a ticket and complete your
          registration.
        </Heading>
      </Center>
      <Button
        type="button"
        colorScheme="blue"
        isLoading={purchasing}
        onClick={async () => {
          setPurchasing(true)
          const idToken = await user.getIdToken()
          await createCheckout(idToken)
        }}
        isFullWidth
        marginBottom={2}
      >
        Go to the payment page
      </Button>
    </>
  )
}
