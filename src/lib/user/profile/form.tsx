import { useForm } from 'react-hook-form'
import { User } from 'firebase/auth'
import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import yup from 'lib/util/yup-config'
import { useProfileAction } from 'lib/user/profile/action'
import { ProfileFormValue } from 'lib/user/profile/type'
import { TextField } from 'components/form/field'
import { FormGroup } from 'components/form/group'

const schema = yup.object().shape({
  username: yup.string().required().label('Username'),
})

interface ProfileFormProps {
  user: User
  profile?: ProfileFormValue
  onRegisterProfile: () => void
}
export function ProfileForm({
  user,
  profile,
  onRegisterProfile,
}: ProfileFormProps) {
  const { processing, upsertProfile } = useProfileAction()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValue>({
    resolver: yupResolver(schema),
    defaultValues: profile,
  })
  return (
    <>
      <Center>
        <Heading as="h2" fontSize="md" fontWeight="normal" marginBottom={4}>
          Registering your profile
        </Heading>
      </Center>

      <Box marginBottom={8}>
        <form
          onSubmit={handleSubmit(async (profile) => {
            await upsertProfile(user, profile)
            onRegisterProfile()
          })}
          role="form"
        >
          <VStack spacing={8}>
            <FormGroup>
              <TextField
                name="username"
                label="Username"
                register={register('username')}
                errors={errors}
                isRequired
              />
            </FormGroup>
          </VStack>
          <Button
            type="submit"
            isLoading={processing}
            isFullWidth
            colorScheme="blue"
            marginBottom={2}
          >
            Next
          </Button>
          <Center>
            <Text fontSize="sm">Go to Payment Services</Text>
          </Center>
        </form>
      </Box>
    </>
  )
}
