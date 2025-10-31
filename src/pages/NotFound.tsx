import { Box, Heading, Text, Button, Container, VStack, Center } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '@/components/common/GlassCard'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Center minH='100vh'>
      <Container maxW='md'>
        <GlassCard p={12} textAlign='center'>
          <VStack spacing={6}>
            <Heading size='2xl' color='purple.500'>
              404
            </Heading>
            <Heading size='lg'>Page Not Found</Heading>
            <Text color='gray.600'>
              Sorry, the page you're looking for doesn't exist or has been moved.
            </Text>
            <Button
              colorScheme='purple'
              size='lg'
              onClick={() => navigate('/')}
            >
              Go Back Home
            </Button>
          </VStack>
        </GlassCard>
      </Container>
    </Center>
  )
}
