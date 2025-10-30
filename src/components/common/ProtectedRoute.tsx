import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: string
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner fullHeight message='Loading...' />
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}
