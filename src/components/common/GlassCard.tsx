import { Box, BoxProps } from '@chakra-ui/react'

interface GlassCardProps extends BoxProps {
  children: React.ReactNode
}

export default function GlassCard({ children, ...props }: GlassCardProps) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(255, 255, 255, 0.3)"
      borderRadius="lg"
      shadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      p={6}
      _hover={{
        shadow: '0 8px 32px 0 rgba(139, 92, 246, 0.4)',
        transform: 'translateY(-4px)',
        transition: 'all 0.3s ease',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
