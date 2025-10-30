import axios, { AxiosInstance } from 'axios'
import { LoginRequest, SignupRequest, TokenResponse } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

class ApiClient {
  private client: AxiosInstance
  private token: string | null = null

  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Load token from localStorage
    const stored = localStorage.getItem('access_token')
    if (stored) {
      this.token = stored
      this.setAuthHeader()
    }

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  private setAuthHeader() {
    if (this.token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    }
  }

  public setToken(token: string, refreshToken: string) {
    this.token = token
    localStorage.setItem('access_token', token)
    localStorage.setItem('refresh_token', refreshToken)
    this.setAuthHeader()
  }

  public getToken() {
    return this.token
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<TokenResponse> {
    const response = await this.client.post<TokenResponse>('/auth/login', credentials)
    this.setToken(response.data.access_token, response.data.refresh_token)
    return response.data
  }

  async signup(data: SignupRequest): Promise<TokenResponse> {
    const response = await this.client.post<TokenResponse>('/auth/signup', data)
    this.setToken(response.data.access_token, response.data.refresh_token)
    return response.data
  }

  async logout() {
    try {
      await this.client.post('/auth/logout')
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.token = null
    }
  }

  // Certificate endpoints
  async uploadCertificate(formData: FormData) {
    return this.client.post('/certificates/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async getCertificates(page: number = 1, limit: number = 10) {
    return this.client.get(`/certificates?page=${page}&limit=${limit}`)
  }

  async getCertificate(id: string) {
    return this.client.get(`/certificates/${id}`)
  }

  // Verification endpoints
  async verifyCertificate(formData: FormData) {
    return this.client.post('/verification/verify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async getVerification(id: string) {
    return this.client.get(`/verification/${id}`)
  }

  // Verification endpoints
  async getMyVerifications(page: number = 1, limit: number = 10) {
    return this.client.get(`/verification/my-verifications?page=${page}&limit=${limit}`)
  }

  // Health check
  async healthCheck() {
    return this.client.get('/health')
  }

  // Generic request methods
  async get<T = any>(url: string, config?: any) {
    return this.client.get<T>(url, config)
  }

  async post<T = any>(url: string, data?: any, config?: any) {
    return this.client.post<T>(url, data, config)
  }

  async put<T = any>(url: string, data?: any, config?: any) {
    return this.client.put<T>(url, data, config)
  }

  async delete<T = any>(url: string, config?: any) {
    return this.client.delete<T>(url, config)
  }

  async patch<T = any>(url: string, data?: any, config?: any) {
    return this.client.patch<T>(url, data, config)
  }
}

export const apiClient = new ApiClient()
