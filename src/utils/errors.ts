/**
 * Error handling utilities for Credify frontend.
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHZ_ERROR', 403)
    this.name = 'AuthorizationError'
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = 'Validation failed',
    public errors?: Record<string, string>
  ) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 'CONFLICT', 409)
    this.name = 'ConflictError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 0)
    this.name = 'NetworkError'
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function isAuthError(error: unknown): boolean {
  return (
    error instanceof AuthenticationError ||
    error instanceof AuthorizationError
  )
}

export function shouldRetry(error: unknown): boolean {
  if (error instanceof AppError) {
    // Retry on network errors and server errors
    return error.statusCode >= 500 || error.code === 'NETWORK_ERROR'
  }
  return false
}
