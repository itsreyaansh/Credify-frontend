import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/services/api'
import { User, LoginRequest, SignupRequest } from '@/types'
import { useToast } from '@chakra-ui/react'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const login = useCallback(
    async (credentials: LoginRequest) => {
      setIsLoading(true)
      try {
        const response = await apiClient.login(credentials)
        setUser({
          id: response.user_id,
          email: credentials.email,
          first_name: '',
          last_name: '',
          role: response.role as any,
          is_active: true,
          created_at: new Date().toISOString(),
        })
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 3000,
        })
        navigate('/dashboard')
      } catch (error: any) {
        toast({
          title: 'Login failed',
          description: error.response?.data?.detail || 'Invalid credentials',
          status: 'error',
          duration: 3000,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [navigate, toast]
  )

  const logout = useCallback(async () => {
    try {
      await apiClient.logout()
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [navigate])

  return {
    user,
    isLoading,
    login,
    logout,
  }
}
