import { useState } from 'react'
import { apiClient } from '@/services/api'

interface VerificationResult {
  _id: string
  certificate_id: string
  verdict: 'verified' | 'suspicious' | 'fraud'
  confidence_score: number
  layers: Record<string, any>
  created_at: string
}

export function useVerification() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastResult, setLastResult] = useState<VerificationResult | null>(null)

  const verify = async (file: File) => {
    setIsVerifying(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post('/verification/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setLastResult(response.data)
      return response.data
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail || 'Verification failed'
      setError(errorMsg)
      return null
    } finally {
      setIsVerifying(false)
    }
  }

  const getVerifications = async () => {
    try {
      const response = await apiClient.get('/verification/my-verifications')
      return response.data.verifications || []
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch verifications')
      return []
    }
  }

  const getVerification = async (id: string) => {
    try {
      const response = await apiClient.get(`/verification/${id}`)
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch verification')
      return null
    }
  }

  const clearError = () => setError(null)

  return {
    isVerifying,
    error,
    lastResult,
    verify,
    getVerifications,
    getVerification,
    clearError,
  }
}
