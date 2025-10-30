import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Container, VStack, Heading, Text, Button } from '@chakra-ui/react'
import GlassCard from './GlassCard'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxW='md' py={20}>
          <GlassCard p={12} textAlign='center'>
            <VStack spacing={6}>
              <Heading size='lg' color='red.500'>
                Something went wrong
              </Heading>
              <Text color='gray.600'>
                We encountered an unexpected error. Please try refreshing the page.
              </Text>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box
                  p={4}
                  bg='rgba(0,0,0,0.1)'
                  borderRadius='md'
                  textAlign='left'
                  maxW='full'
                  overflowX='auto'
                >
                  <Text fontSize='sm' fontFamily='mono'>
                    {this.state.error.message}
                  </Text>
                </Box>
              )}
              <Button
                colorScheme='purple'
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </VStack>
          </GlassCard>
        </Container>
      )
    }

    return this.props.children
  }
}
