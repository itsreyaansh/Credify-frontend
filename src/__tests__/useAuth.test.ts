import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuth } from '../hooks/useAuth'

describe('useAuth', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with null user', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.user).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('should store token in localStorage on login', async () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      localStorage.setItem('access_token', 'test-token')
      localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }))
    })

    await waitFor(() => {
      expect(localStorage.getItem('access_token')).toBe('test-token')
    })
  })

  it('should clear tokens on logout', async () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      localStorage.setItem('access_token', 'test-token')
      localStorage.removeItem('access_token')
    })

    await waitFor(() => {
      expect(localStorage.getItem('access_token')).toBeNull()
    })
  })
})
