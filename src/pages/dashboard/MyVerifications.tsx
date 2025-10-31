import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
  Input,
  HStack,
  Button,
} from '@chakra-ui/react'
import GlassCard from '@/components/common/GlassCard'
import { apiClient } from '@/services/api'

interface Verification {
  _id: string
  certificate_id: string
  verdict: string
  confidence_score: number
  created_at: string
}

export default function MyVerifications() {
  const [verifications, setVerifications] = useState<Verification[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const response = await apiClient.get('/verification/my-verifications')
        setVerifications(response.data.verifications || [])
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to load verifications',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchVerifications()
  }, [toast])

  const filteredVerifications = verifications.filter((v) =>
    v.certificate_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'verified':
        return 'green'
      case 'suspicious':
        return 'orange'
      case 'fraud':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <Container maxW='1200px' py={8}>
      <VStack spacing={8} align='stretch'>
        <Box>
          <Heading size='lg' mb={2}>
            My Verifications
          </Heading>
        </Box>

        <HStack spacing={4}>
          <Input
            placeholder='Search by certificate ID...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button colorScheme='purple'>Search</Button>
        </HStack>

        <GlassCard p={6} overflowX='auto'>
          {isLoading ? (
            <Box textAlign='center'>Loading...</Box>
          ) : filteredVerifications.length === 0 ? (
            <Box textAlign='center'>No verifications found</Box>
          ) : (
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Certificate ID</Th>
                  <Th>Verdict</Th>
                  <Th>Confidence Score</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredVerifications.map((verification) => (
                  <Tr key={verification._id}>
                    <Td>{verification.certificate_id}</Td>
                    <Td>
                      <Badge colorScheme={getVerdictColor(verification.verdict)}>
                        {verification.verdict.toUpperCase()}
                      </Badge>
                    </Td>
                    <Td>{verification.confidence_score}%</Td>
                    <Td>
                      {new Date(verification.created_at).toLocaleDateString()}
                    </Td>
                    <Td>
                      <Button size='sm' variant='ghost'>
                        View Details
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </GlassCard>
      </VStack>
    </Container>
  )
}
