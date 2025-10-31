import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Button from '../../components/common/Button'

describe('Button Component', () => {
  const renderButton = (props: any = {}) => {
    return render(
      <ChakraProvider>
        <Button {...props} />
      </ChakraProvider>
    )
  }

  it('should render button with text', () => {
    renderButton({ children: 'Click me' })
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should handle click event', () => {
    const handleClick = vi.fn()
    renderButton({ children: 'Click', onClick: handleClick })

    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    renderButton({ children: 'Click', isDisabled: true })
    expect(screen.getByText('Click')).toBeDisabled()
  })
})
