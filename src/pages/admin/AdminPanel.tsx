import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react'
import GlassCard from '@/components/common/GlassCard'
import { apiClient } from '@/services/api'

interface AdminStats {
  totalUsers: number
  totalCertificates: number
  totalVerifications: number
  fraudCasesDetected: number
  systemUptime: string
  averageVerificationTime: string
}

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/admin/stats')
        setStats(response.data)
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to load admin stats',
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
    <Container maxW='1400px' py={8}>
      <VStack spacing={8} align='stretch'>
        <Box>
          <Heading size='lg' mb={2}>
            Admin Dashboard
          </Heading>
        </Box>

        {/* Stats Grid */}
        {stats && (
          <Grid templateColumns='repeat(auto-fit, minmax(250px, 1fr))' gap={6}>
            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>Total Users</StatLabel>
                  <StatNumber>{stats.totalUsers}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>

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
                  <StatLabel>Total Verifications</StatLabel>
                  <StatNumber>{stats.totalVerifications}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>

            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>Fraud Cases Detected</StatLabel>
                  <StatNumber color='red.500'>
                    {stats.fraudCasesDetected}
                  </StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>

            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>System Uptime</StatLabel>
                  <StatNumber>{stats.systemUptime}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>

            <GridItem>
              <GlassCard p={6}>
                <Stat>
                  <StatLabel>Avg Verification Time</StatLabel>
                  <StatNumber>{stats.averageVerificationTime}</StatNumber>
                </Stat>
              </GlassCard>
            </GridItem>
          </Grid>
        )}

        {/* Tabs */}
        <Tabs>
          <TabList>
            <Tab>Users</Tab>
            <Tab>Reports</Tab>
            <Tab>Settings</Tab>
            <Tab>Logs</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <GlassCard p={6}>
                <Heading size='md' mb={4}>
                  User Management
                </Heading>
                <Box>Loading user data...</Box>
              </GlassCard>
            </TabPanel>

            <TabPanel>
              <GlassCard p={6}>
                <Heading size='md' mb={4}>
                  Fraud Reports
                </Heading>
                <Box>Loading fraud reports...</Box>
              </GlassCard>
            </TabPanel>

            <TabPanel>
              <GlassCard p={6}>
                <Heading size='md' mb={4}>
                  System Settings
                </Heading>
                <Box>Loading settings...</Box>
              </GlassCard>
            </TabPanel>

            <TabPanel>
              <GlassCard p={6}>
                <Heading size='md' mb={4}>
                  System Logs
                </Heading>
                <Box>Loading logs...</Box>
              </GlassCard>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}
