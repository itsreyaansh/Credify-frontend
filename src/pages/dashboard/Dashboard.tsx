import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/services/api'
import GlassCard from '@/components/common/GlassCard'

interface DashboardStats {
  totalCertificates: number
  verifiedCertificates: number
  suspiciousCertificates: number
  recentVerifications: number
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/dashboard/stats')
        setStats(response.data)
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to load dashboard stats',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [toast])

  return (
    <Container maxW='1200px' py={8}>
      <VStack spacing={8} align='stretch'>
        {/* Header */}
        <Box>
          <Heading size='lg'>Welcome back, {user?.first_name}!</Heading>
          <Text color='gray.600' mt={2}>
            Here's an overview of your certificates and verifications
          </Text>
        </Box>

        {/* Stats Grid */}
        {stats && (
          <Grid templateColumns='repeat(auto-fit, minmax(250px, 1fr))' gap={6}>
            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>Total Certificates</StatLabel>
                  <StatNumber>{stats.totalCertificates}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>

            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>Verified</StatLabel>
                  <StatNumber color='green.500'>{stats.verifiedCertificates}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>

            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>Suspicious</StatLabel>
                  <StatNumber color='red.500'>{stats.suspiciousCertificates}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>

            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>Recent Verifications</StatLabel>
                  <StatNumber>{stats.recentVerifications}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>
          </Grid>
        )}

        {/* Actions */}
        <HStack spacing={4} justify='center'>
          <Button colorScheme='purple' size='lg'>
            Verify Certificate
          </Button>
          <Button variant='outline' size='lg'>
            View My Certificates
          </Button>
          <Button variant='outline' size='lg'>
            Download Report
          </Button>
        </HStack>

        {/* Recent Activity */}
        <GlassCard p={6}>
          <Heading size='md' mb={4}>
            Recent Activity
          </Heading>
          <Text color='gray.600'>
            No recent verifications yet
          </Text>
        </GlassCard>
      </VStack>
    </Container>
  )
}
