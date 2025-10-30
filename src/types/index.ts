// User Types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role: 'student' | 'issuer' | 'verifier' | 'admin'
  is_active: boolean
  created_at: string
  last_login?: string
}

// Certificate Types
export interface Certificate {
  id: string
  certificate_id: string
  certificate_name: string
  holder_name: string
  issue_date: string
  expiry_date?: string
  certificate_image?: string
  qr_code_data?: string
  is_revoked: boolean
  metadata?: Record<string, any>
  created_at: string
}

// Verification Types
export interface Verification {
  verification_id: string
  confidence_score: number
  verdict: 'verified' | 'suspicious' | 'fraud'
  processing_time_ms: number
  fraud_layers_result?: FraudLayersResult
  layer_details?: Record<string, any>
  created_at?: string
}

export interface FraudLayersResult {
  exif_score: number
  ela_score: number
  gemini_score: number
  database_score: number
  blockchain_score: number
  geo_fraud_score: number
}

// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  first_name: string
  last_name: string
  role: 'student' | 'issuer' | 'verifier'
  institution_id: string
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  user_id: string
  role: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
}
