/**
 * Validates a Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica) tax identification number.
 * @returns True if the CNPJ is valid, false otherwise.
 */
export function isValidCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/[^\d]+/g, '')

  if (cleanCNPJ.length !== 14) return false

  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false

  const digits = cleanCNPJ.split('').map(Number)

  const calcFirstDigit = (arr: number[]) => {
    let sum = 0
    let weight = 5
    for (let i = 0; i < 12; i++) {
      sum += arr[i] * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const calcSecondDigit = (arr: number[]) => {
    let sum = 0
    let weight = 6
    for (let i = 0; i < 13; i++) {
      sum += arr[i] * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const firstDigit = calcFirstDigit(digits.slice(0, 12))

  if (firstDigit !== digits[12]) return false

  const secondDigit = calcSecondDigit(digits.slice(0, 13))

  return secondDigit === digits[13]
}
