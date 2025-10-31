import { Box, Container, Heading, Text, Button, Flex, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)" color="white" py={20}>
        <Container maxW="container.lg">
          <VStack spacing={8}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Heading as="h1" size="2xl" textAlign="center">
                Trust Every Certificate
              </Heading>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Text fontSize="lg" textAlign="center" maxW="2xl">
                AI-powered fraud detection for academic certificates. Verify certificates in seconds, not weeks.
              </Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Flex gap={4}>
                <Button size="lg" bg="white" color="blue.600">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" borderColor="white" color="white">
                  Learn More
                </Button>
              </Flex>
            </motion.div>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg="gray.50">
        <Container maxW="container.lg">
          <Heading textAlign="center" mb={12}>
            6-Layer Fraud Detection
          </Heading>
          <Text textAlign="center" mb={8} color="gray.600">
            Advanced AI analysis with 94% accuracy
          </Text>
        </Container>
      </Box>
    </Box>
  )
}
