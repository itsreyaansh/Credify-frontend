import { Box, Flex, Button, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <Box bg="white" shadow="sm" borderBottom="1px solid" borderColor="gray.200" py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Box fontSize="xl" fontWeight="bold">
              Credify
            </Box>
          </Link>
          <Flex gap={4}>
            <Button variant="ghost">Login</Button>
            <Button bg="linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)" color="white">
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
