import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Progress,
  Divider,
  List,
  ListItem,
  ListIcon,
  Icon,
} from '@chakra-ui/react'
import { CheckCircleIcon, WarningIcon, CloseIcon } from '@chakra-ui/icons'
import GlassCard from './GlassCard'

interface LayerResult {
  name: string
  score: number
  maxScore: number
  passed: boolean
  details?: string
}

interface VerificationResultProps {
  verdict: 'verified' | 'suspicious' | 'fraud'
  confidenceScore: number
  layers: LayerResult[]
  certificateHash?: string
  blockchainStatus?: string
  details?: string
}

export default function VerificationResult({
  verdict,
  confidenceScore,
  layers,
  certificateHash,
  blockchainStatus,
  details,
}: VerificationResultProps) {
  const getVerdictColor = () => {
    switch (verdict) {
      case 'verified':
        return 'green'
      case 'suspicious':
        return 'orange'
      case 'fraud':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getVerdictIcon = () => {
    switch (verdict) {
      case 'verified':
        return CheckCircleIcon
      case 'suspicious':
        return WarningIcon
      case 'fraud':
        return CloseIcon
      default:
        return WarningIcon
    }
  }

  return (
    <GlassCard p={8}>
      <VStack spacing={6} align='start' w='full'>
        {/* Header */}
        <HStack spacing={4} w='full'>
          <Icon as={getVerdictIcon()} w={10} h={10} color={`${getVerdictColor()}.500`} />
          <Box>
            <Heading size='lg' mb={2}>
              Verification Result
            </Heading>
            <Badge colorScheme={getVerdictColor()} fontSize='md' p={2}>
              {verdict.toUpperCase()}
            </Badge>
          </Box>
        </HStack>

        {/* Confidence Score */}
        <Box w='full'>
          <HStack justify='space-between' mb={2}>
            <Text fontWeight='bold'>Confidence Score</Text>
            <Text fontSize='xl' fontWeight='bold' color={`${getVerdictColor()}.500`}>
              {confidenceScore}%
            </Text>
          </HStack>
          <Progress value={confidenceScore} colorScheme={getVerdictColor()} />
        </Box>

        <Divider />

        {/* Layers Analysis */}
        <Box w='full'>
          <Heading size='md' mb={4}>
            Analysis Layers
          </Heading>
          <VStack spacing={4} align='start'>
            {layers.map((layer) => (
              <Box w='full' key={layer.name}>
                <HStack justify='space-between' mb={2}>
                  <Text fontWeight='medium'>{layer.name}</Text>
                  <HStack spacing={2}>
                    <Text>
                      {layer.score}/{layer.maxScore}
                    </Text>
                    {layer.passed ? (
                      <CheckCircleIcon color='green.500' />
                    ) : (
                      <WarningIcon color='orange.500' />
                    )}
                  </HStack>
                </HStack>
                <Progress
                  value={(layer.score / layer.maxScore) * 100}
                  colorScheme={layer.passed ? 'green' : 'orange'}
                  size='sm'
                />
                {layer.details && (
                  <Text fontSize='sm' color='gray.600' mt={1}>
                    {layer.details}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Additional Details */}
        {(certificateHash || blockchainStatus) && (
          <>
            <Divider />
            <Box w='full'>
              <Heading size='md' mb={4}>
                Additional Information
              </Heading>
              <VStack spacing={3} align='start'>
                {certificateHash && (
                  <Box>
                    <Text fontSize='sm' color='gray.600'>
                      Certificate Hash
                    </Text>
                    <Text
                      fontSize='xs'
                      fontFamily='mono'
                      p={2}
                      bg='rgba(0,0,0,0.1)'
                      borderRadius='md'
                      overflowWrap='break-word'
                    >
                      {certificateHash}
                    </Text>
                  </Box>
                )}
                {blockchainStatus && (
                  <Box>
                    <Text fontSize='sm' color='gray.600'>
                      Blockchain Status
                    </Text>
                    <Text>{blockchainStatus}</Text>
                  </Box>
                )}
              </VStack>
            </Box>
          </>
        )}

        {/* Details */}
        {details && (
          <>
            <Divider />
            <Box w='full'>
              <Heading size='md' mb={2}>
                Details
              </Heading>
              <Text color='gray.700'>{details}</Text>
            </Box>
          </>
        )}
      </VStack>
    </GlassCard>
  )
}
