import { Spinner, Center, VStack, Text, Box } from '@chakra-ui/react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  message?: string
  fullHeight?: boolean
}

export default function LoadingSpinner({
  size = 'md',
  message,
  fullHeight = false,
}: LoadingSpinnerProps) {
  const content = (
    <VStack spacing={4}>
      <Spinner size={size} color='purple.500' thickness='4px' />
      {message && (
        <Text color='gray.600' fontSize='sm'>
          {message}
        </Text>
      )}
    </VStack>
  )

  if (fullHeight) {
    return <Center minH='100vh'>{content}</Center>
  }

  return <Center p={8}>{content}</Center>
}
