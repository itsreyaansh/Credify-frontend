import { extendTheme } from '@chakra-ui/react'
import colors from './colors'
import animations from './animations'
import { glassmorphismStyles } from './glassmorphism'

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: 'white',
        color: 'gray.900',
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.6',
      },
      '*': {
        '&:focus': {
          outline: 'none',
          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.5)',
        },
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
      },
      variants: {
        primary: {
          bg: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          color: 'white',
          _hover: {
            boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.4)',
          },
        },
        glass: glassmorphismStyles.button,
      },
    },
    Card: {
      baseStyle: {
        ...glassmorphismStyles.card,
      },
    },
  },
})

export default theme
