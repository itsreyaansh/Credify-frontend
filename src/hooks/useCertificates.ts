import { useState, useEffect } from 'react'
import { apiClient } from '@/services/api'

interface Certificate {
  _id: string
  certificate_id: string
  course_name: string
  issue_date: string
  expiry_date: string
  metadata: Record<string, any>
  created_at: string
}

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCertificates = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.get('/certificates')
      setCertificates(response.data.certificates || [])
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch certificates')
    } finally {
      setIsLoading(false)
    }
  }

  const getCertificate = async (id: string) => {
    try {
      const response = await apiClient.get(`/certificates/${id}`)
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch certificate')
      return null
    }
  }

  const uploadCertificate = async (file: File, metadata?: Record<string, any>) => {
    const formData = new FormData()
    formData.append('file', file)
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata))
    }

    try {
      const response = await apiClient.post('/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setCertificates([...certificates, response.data])
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload certificate')
      return null
    }
  }

  const deleteCertificate = async (id: string) => {
    try {
      await apiClient.delete(`/certificates/${id}`)
      setCertificates(certificates.filter((c) => c._id !== id))
      return true
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete certificate')
      return false
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  return {
    certificates,
    isLoading,
    error,
    refetch: fetchCertificates,
    getCertificate,
    uploadCertificate,
    deleteCertificate,
  }
}
