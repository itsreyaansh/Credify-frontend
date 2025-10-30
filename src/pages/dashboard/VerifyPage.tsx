import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Progress,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import GlassCard from '@/components/common/GlassCard'
import { apiClient } from '@/services/api'

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const toast = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleVerify = async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 30
        })
      }, 500)

      const response = await apiClient.post('/verification/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      clearInterval(progressInterval)
      setProgress(100)
      setResult(response.data)

      toast({
        title: 'Verification Complete',
        description: `Confidence Score: ${response.data.confidence_score}%`,
        status: response.data.verdict === 'verified' ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Verification failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW='md' py={20}>
      <VStack spacing={8}>
        <Box textAlign='center'>
          <Heading size='lg' mb={2}>
            Verify Certificate
          </Heading>
          <Text color='gray.600'>
            Upload your certificate image to verify its authenticity
          </Text>
        </Box>

        <GlassCard w='full' p={8}>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>Select Certificate Image</FormLabel>
              <Input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </FormControl>

            {isLoading && (
              <Box w='full'>
                <Progress value={progress} colorScheme='purple' mb={2} />
                <Text fontSize='sm' color='gray.600' textAlign='center'>
                  Analyzing certificate... {Math.round(progress)}%
                </Text>
              </Box>
            )}

            <Button
              colorScheme='purple'
              w='full'
              onClick={handleVerify}
              isLoading={isLoading}
              disabled={!file}
            >
              Verify Certificate
            </Button>
          </VStack>
        </GlassCard>

        {result && (
          <GlassCard w='full' p={8}>
            <VStack spacing={4} align='start'>
              <Heading size='md'>Verification Result</Heading>
              <Box>
                <Text fontWeight='bold'>Verdict</Text>
                <Text
                  color={
                    result.verdict === 'verified' ? 'green.500' : 'red.500'
                  }
                  fontSize='lg'
                >
                  {result.verdict?.toUpperCase()}
                </Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Confidence Score</Text>
                <Text fontSize='lg'>{result.confidence_score}%</Text>
              </Box>
              {result.details && (
                <Box>
                  <Text fontWeight='bold'>Details</Text>
                  <Text>{result.details}</Text>
                </Box>
              )}
            </VStack>
          </GlassCard>
        )}
      </VStack>
    </Container>
  )
}
