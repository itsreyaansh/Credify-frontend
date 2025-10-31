import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Button,
  Badge,
  Divider,
  useDisclosure,
  AspectRatio,
} from '@chakra-ui/react'
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import GlassCard from './GlassCard'
import Modal from './Modal'
import { useState } from 'react'

interface CertificateViewerProps {
  id?: string
  certificateId: string
  courseName: string
  issuedBy: string
  issueDate: string
  expiryDate?: string
  imageUrl?: string
  metadata?: Record<string, any>
  onDownload?: () => void
  onVerify?: () => void
}

export default function CertificateViewer({
  id,
  certificateId,
  courseName,
  issuedBy,
  issueDate,
  expiryDate,
  imageUrl,
  metadata,
  onDownload,
  onVerify,
}: CertificateViewerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fullscreen, setFullscreen] = useState(false)

  const isExpired =
    expiryDate && new Date(expiryDate) < new Date()

  return (
    <>
      <GlassCard p={6}>
        <VStack spacing={6} align='start' w='full'>
          {/* Certificate Preview */}
          {imageUrl && (
            <Box w='full' borderRadius='lg' overflow='hidden'>
              <AspectRatio ratio={16 / 10}>
                <Image
                  src={imageUrl}
                  alt={certificateId}
                  objectFit='cover'
                  cursor='pointer'
                  onClick={onOpen}
                  _hover={{ opacity: 0.8 }}
                />
              </AspectRatio>
            </Box>
          )}

          {/* Certificate Details */}
          <VStack spacing={3} align='start' w='full'>
            <HStack justify='space-between' w='full'>
              <Heading size='md'>{certificateId}</Heading>
              {isExpired && (
                <Badge colorScheme='red'>Expired</Badge>
              )}
            </HStack>

            <Text fontWeight='medium' fontSize='lg'>
              {courseName}
            </Text>

            <Text color='gray.600'>Issued by {issuedBy}</Text>

            <Divider />

            <HStack w='full' justify='space-between'>
              <VStack spacing={1} align='start'>
                <Text fontSize='sm' color='gray.600'>
                  Issue Date
                </Text>
                <Text fontWeight='medium'>
                  {new Date(issueDate).toLocaleDateString()}
                </Text>
              </VStack>

              {expiryDate && (
                <VStack spacing={1} align='start'>
                  <Text fontSize='sm' color='gray.600'>
                    Expiry Date
                  </Text>
                  <Text fontWeight='medium' color={isExpired ? 'red.500' : 'inherit'}>
                    {new Date(expiryDate).toLocaleDateString()}
                  </Text>
                </VStack>
              )}
            </HStack>

            {/* Metadata */}
            {metadata && Object.keys(metadata).length > 0 && (
              <>
                <Divider />
                <VStack spacing={2} align='start' w='full'>
                  <Text fontWeight='bold' fontSize='sm'>
                    Additional Information
                  </Text>
                  {Object.entries(metadata).map(([key, value]) => (
                    <HStack key={key} w='full' justify='space-between'>
                      <Text fontSize='sm' color='gray.600' textTransform='capitalize'>
                        {key.replace(/_/g, ' ')}
                      </Text>
                      <Text fontSize='sm'>{String(value)}</Text>
                    </HStack>
                  ))}
                </VStack>
              </>
            )}
          </VStack>

          {/* Actions */}
          <HStack spacing={4} w='full' justify='flex-end'>
            {onDownload && (
              <Button
                size='sm'
                leftIcon={<DownloadIcon />}
                onClick={onDownload}
              >
                Download
              </Button>
            )}
            {onVerify && (
              <Button
                size='sm'
                colorScheme='purple'
                onClick={onVerify}
              >
                Verify
              </Button>
            )}
          </HStack>
        </VStack>
      </GlassCard>

      {/* Full Screen Modal */}
      {imageUrl && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={certificateId}
          size='full'
        >
          <Image
            src={imageUrl}
            alt={certificateId}
            maxH='90vh'
            w='auto'
            mx='auto'
          />
        </Modal>
      )}
    </>
  )
}
