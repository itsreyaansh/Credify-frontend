import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from '../utils/validators'

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should accept strong password', () => {
      const result = validatePassword('SecurePass123!')
      expect(result.valid).toBe(true)
      expect(result.errors.length).toBe(0)
    })

    it('should reject weak password', () => {
      // Too short
      let result = validatePassword('pass')
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)

      // No uppercase
      result = validatePassword('password123!')
      expect(result.valid).toBe(false)

      // No numbers
      result = validatePassword('PasswordABC!')
      expect(result.valid).toBe(false)

      // No special characters
      result = validatePassword('Password123')
      expect(result.valid).toBe(false)
    })
  })

  describe('validateRequired', () => {
    it('should validate non-empty string', () => {
      expect(validateRequired('text')).toBe(true)
    })

    it('should reject empty string', () => {
      expect(validateRequired('')).toBe(false)
      expect(validateRequired('   ')).toBe(false)
    })
  })
})
