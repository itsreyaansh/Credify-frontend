import { Box, Container, Heading, Input, Button, VStack } from '@chakra-ui/react'

export default function Signup() {
  return (
    <Container maxW="sm" py={20}>
      <VStack spacing={4}>
        <Heading>Create Account</Heading>
        <Input placeholder="Email" />
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Confirm Password" type="password" />
        <Button width="full" bg="linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)" color="white">
          Sign Up
        </Button>
      </VStack>
    </Container>
  )
}
