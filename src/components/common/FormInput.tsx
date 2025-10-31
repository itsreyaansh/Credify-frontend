import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputProps,
  Select,
  Textarea,
} from '@chakra-ui/react'

interface FormInputProps extends InputProps {
  label?: string
  error?: string
  helperText?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
}

interface FormSelectProps {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ label: string; value: string }>
  value?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
}

interface FormTextareaProps {
  label?: string
  error?: string
  helperText?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
  rows?: number
}

export function FormInput({
  label,
  error,
  helperText,
  type = 'text',
  isRequired,
  ...props
}: FormInputProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input type={type} {...props} />
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export function FormSelect({
  label,
  error,
  helperText,
  options,
  value,
  onChange,
  isDisabled,
  isRequired,
  placeholder,
}: FormSelectProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        isDisabled={isDisabled}
        placeholder={placeholder}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export function FormTextarea({
  label,
  error,
  helperText,
  value,
  onChange,
  isDisabled,
  isRequired,
  placeholder,
  rows = 4,
}: FormTextareaProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <Textarea
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        placeholder={placeholder}
        rows={rows}
      />
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
