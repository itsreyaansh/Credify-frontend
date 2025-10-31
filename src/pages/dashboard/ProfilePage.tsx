import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Avatar,
  Divider,
} from '@chakra-ui/react'
import { useAuth } from '@/hooks/useAuth'
import GlassCard from '@/components/common/GlassCard'
import { apiClient } from '@/services/api'

export default function ProfilePage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await apiClient.put('/auth/profile', formData)
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to update profile',
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
          <Avatar
            size='2xl'
            name={`${formData.first_name} ${formData.last_name}`}
            mb={4}
          />
          <Heading size='lg'>My Profile</Heading>
        </Box>

        <GlassCard w='full' p={8}>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name='first_name'
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name='last_name'
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name='email'
                type='email'
                value={formData.email}
                isReadOnly
              />
              <Text fontSize='sm' color='gray.500' mt={2}>
                Email cannot be changed
              </Text>
            </FormControl>

            <HStack spacing={4} w='full'>
              <Button
                colorScheme='purple'
                flex={1}
                isLoading={isLoading}
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button variant='outline' flex={1}>
                Cancel
              </Button>
            </HStack>
          </VStack>
        </GlassCard>

        <Divider />

        <Box w='full'>
          <Heading size='md' mb={4}>
            Account Settings
          </Heading>
          <GlassCard p={6} mb={4}>
            <HStack justify='space-between'>
              <Box>
                <Text fontWeight='bold'>Change Password</Text>
                <Text fontSize='sm' color='gray.600'>
                  Update your password regularly
                </Text>
              </Box>
              <Button size='sm' variant='outline'>
                Change
              </Button>
            </HStack>
          </GlassCard>

          <GlassCard p={6}>
            <HStack justify='space-between'>
              <Box>
                <Text fontWeight='bold'>Two-Factor Authentication</Text>
                <Text fontSize='sm' color='gray.600'>
                  Add an extra layer of security
                </Text>
              </Box>
              <Button size='sm' variant='outline'>
                Enable
              </Button>
            </HStack>
          </GlassCard>
        </Box>
      </VStack>
    </Container>
  )
}
