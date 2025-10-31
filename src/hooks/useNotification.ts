import { useToast, UseToastOptions } from '@chakra-ui/react'

interface NotificationOptions extends UseToastOptions {
  message: string
}

export function useNotification() {
  const toast = useToast()

  const showSuccess = (options: NotificationOptions) => {
    toast({
      title: options.title || 'Success',
      description: options.message,
      status: 'success',
      duration: 5000,
      isClosable: true,
      ...options,
    })
  }

  const showError = (options: NotificationOptions) => {
    toast({
      title: options.title || 'Error',
      description: options.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      ...options,
    })
  }

  const showInfo = (options: NotificationOptions) => {
    toast({
      title: options.title || 'Info',
      description: options.message,
      status: 'info',
      duration: 5000,
      isClosable: true,
      ...options,
    })
  }

  const showWarning = (options: NotificationOptions) => {
    toast({
      title: options.title || 'Warning',
      description: options.message,
      status: 'warning',
      duration: 5000,
      isClosable: true,
      ...options,
    })
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  }
}
