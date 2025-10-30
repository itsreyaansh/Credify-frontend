export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Credify'

// Fraud verdict thresholds
export const FRAUD_THRESHOLDS = {
  VERIFIED: 80,
  SUSPICIOUS: 40,
  FRAUD: 0,
}

// API endpoints
export const ENDPOINTS = {
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  CERTIFICATES_UPLOAD: '/certificates/upload',
  CERTIFICATES_LIST: '/certificates',
  VERIFICATION_VERIFY: '/verification/verify',
  ADMIN_FRAUD_FEED: '/admin/fraud-feed',
}
