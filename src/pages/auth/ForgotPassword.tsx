import { useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '@/components/common/GlassCard'
import { apiClient } from '@/services/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await apiClient.post('/auth/forgot-password', { email })
      setIsSubmitted(true)
      toast({
        title: 'Success',
        description: 'Check your email for password reset link',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to send reset email')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW='md' py={20}>
      <VStack spacing={8}>
        <Box textAlign='center'>
          <Heading size='lg' mb={2}>
            Reset Password
          </Heading>
          <Text color='gray.600'>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </Box>

        {isSubmitted ? (
          <GlassCard w='full' p={8} textAlign='center'>
            <Heading size='sm' mb={4}>
              Check Your Email
            </Heading>
            <Text mb={6}>
              We've sent a password reset link to {email}
            </Text>
            <Button colorScheme='purple' w='full' onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </GlassCard>
        ) : (
          <GlassCard w='full' as='form' onSubmit={handleSubmit} p={8}>
            <VStack spacing={6}>
              <FormControl isInvalid={!!error}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type='email'
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>

              <Button
                type='submit'
                colorScheme='purple'
                w='full'
                isLoading={isLoading}
              >
                Send Reset Link
              </Button>

              <Button
                variant='ghost'
                w='full'
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </VStack>
          </GlassCard>
        )}
      </VStack>
    </Container>
  )
}
