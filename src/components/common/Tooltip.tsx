import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'

interface CustomTooltipProps extends Omit<ChakraTooltipProps, 'children'> {
  label: string
  children: React.ReactElement
}

export default function Tooltip({
  label,
  children,
  placement = 'top',
  ...props
}: CustomTooltipProps) {
  return (
    <ChakraTooltip
      label={label}
      placement={placement}
      hasArrow
      bg='gray.700'
      color='white'
      {...props}
    >
      {children}
    </ChakraTooltip>
  )
}
