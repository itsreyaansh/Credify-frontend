import { Box, Container, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box bg="gray.900" color="white" py={8} mt={12}>
      <Container maxW="container.xl">
        <Text textAlign="center">
          © 2024 Credify. All rights reserved. | Smart India Hackathon 2025 | Team: Black Sparrow
        </Text>
      </Container>
    </Box>
  )
}
