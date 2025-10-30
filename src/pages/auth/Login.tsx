import { Box, Container, Heading, Input, Button, VStack } from '@chakra-ui/react'

export default function Login() {
  return (
    <Container maxW="sm" py={20}>
      <VStack spacing={8}>
        <Heading>Login</Heading>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button width="full" bg="linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)" color="white">
          Sign In
        </Button>
      </VStack>
    </Container>
  )
}
