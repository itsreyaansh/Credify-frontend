import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'glass' | 'danger'
}

export default function Button({ variant = 'primary', ...props }: CustomButtonProps) {
  const variants: Record<string, any> = {
    primary: {
      bg: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      color: 'white',
      _hover: { transform: 'translateY(-2px)', shadow: 'lg' },
    },
    secondary: {
      bg: 'gray.200',
      color: 'gray.900',
      _hover: { bg: 'gray.300' },
    },
    glass: {
      bg: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      _hover: { bg: 'rgba(255, 255, 255, 0.2)' },
    },
    danger: {
      bg: '#EF4444',
      color: 'white',
      _hover: { bg: '#DC2626' },
    },
  }

  return <ChakraButton {...variants[variant]} {...props} />
}
