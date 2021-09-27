import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import {
  Checkbox,
  FormErrorMessage,
  FormLabel,
  FormControl,
  FormHelperText,
  Input,
  Select,
  Tag,
  Text,
  HStack,
  Radio,
  Textarea,
  RadioGroup,
} from '@chakra-ui/react'

interface FormFieldProps {
  name: string
  label: string
  register: UseFormRegisterReturn
  errors: FieldErrors
  children: React.ReactNode
  isRequired?: boolean
  helperText?: string
}
export function FormField({
  name,
  label,
  errors,
  children,
  isRequired = false,
  helperText,
}: FormFieldProps) {
  return (
    <FormControl isInvalid={errors[name] !== undefined}>
      <FormLabel htmlFor={name}>
        <HStack>
          {isRequired ? null : <Tag size="sm">任意</Tag>}
          <Text>{label}</Text>
        </HStack>
      </FormLabel>
      {children}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
type TextFieldProps = Omit<FormFieldProps, 'children'> & {
  isMultiline?: boolean
}
export function TextField({
  name,
  label,
  register,
  errors,
  isRequired,
  helperText,
  isMultiline = false,
}: TextFieldProps) {
  return (
    <FormField
      name={name}
      label={label}
      errors={errors}
      register={register}
      isRequired={isRequired}
      helperText={helperText}
    >
      {isMultiline ? (
        <Textarea
          id={name}
          placeholder={label}
          variant="filled"
          {...register}
        />
      ) : (
        <Input id={name} placeholder={label} variant="filled" {...register} />
      )}
    </FormField>
  )
}

type SelectFieldVariant = 'select' | 'radio'
type SelectFieldProps = Omit<FormFieldProps, 'children'> & {
  optionCollection: Array<{ value: string | boolean; label: string }>
  variant?: SelectFieldVariant
}
export function SelectField({
  name,
  label,
  register,
  errors,
  optionCollection,
  isRequired,
  helperText,
  variant = 'select',
}: SelectFieldProps) {
  return (
    <FormField
      name={name}
      label={label}
      errors={errors}
      register={register}
      isRequired={isRequired}
      helperText={helperText}
    >
      {variant === 'select' && (
        <Select id={name} placeholder={label} variant="filled" {...register}>
          {optionCollection.map((option) => (
            <option key={`${name}-${option.label}`} value={`${option.value}`}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
      {variant === 'radio' && (
        <RadioGroup name={name}>
          <HStack>
            {optionCollection.map((option) => (
              <Radio
                key={`${name}-${option.label}`}
                value={`${option.value}`}
                {...register}
              >
                {option.label}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      )}
    </FormField>
  )
}

type CheckboxFieldProps = Omit<FormFieldProps, 'children'> & {
  checkboxLabel: string
}
export function CheckboxField({
  name,
  label,
  errors,
  register,
  isRequired,
  helperText,
  checkboxLabel,
}: CheckboxFieldProps) {
  return (
    <FormField
      name={name}
      label={label}
      errors={errors}
      register={register}
      isRequired={isRequired}
      helperText={helperText}
    >
      <Checkbox id={name} {...register}>
        {checkboxLabel}
      </Checkbox>
    </FormField>
  )
}
