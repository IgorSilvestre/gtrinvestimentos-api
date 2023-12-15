export function formatPhoneNumber(input) {
  if (typeof input !== 'string') {
    return input + ' (Número inválido)'
  }

  // Remove all non-digit characters from the input string
  let digitsOnly = input.replace(/\D/g, '')

  // Remove leading zeros
  digitsOnly = digitsOnly.replace(/^0+/, '')

  // Remove country code
  digitsOnly = digitsOnly.replace(/^55+/, '')

  // Check if the input has the right number of digits
  if (digitsOnly.length !== 11 && digitsOnly.length !== 10) {
    return input + ' (Número inválido)'
  }

  // Extract the area code and the rest of the number
  const areaCode = digitsOnly.substr(0, 2)
  const rest = digitsOnly.substr(2)

  // Determine the appropriate format based on the number of digits
  let formattedNumber
  if (digitsOnly.length === 11) {
    formattedNumber = `(${areaCode}) ${rest.substr(0, 5)}-${rest.substr(5)}`
  } else {
    formattedNumber = `(${areaCode}) ${rest.substr(0, 4)}-${rest.substr(4)}`
  }

  return formattedNumber
}
