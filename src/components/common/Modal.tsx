import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
    isLoading?: boolean
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  size?: ChakraModalProps['size']
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  size = 'md',
}: CustomModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay backdropFilter='blur(4px)' />
      <ModalContent bg='rgba(255, 255, 255, 0.1)' backdropFilter='blur(20px)'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {secondaryAction && (
            <Button mr={3} variant='ghost' onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              colorScheme='purple'
              onClick={primaryAction.onClick}
              isLoading={primaryAction.isLoading}
            >
              {primaryAction.label}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
