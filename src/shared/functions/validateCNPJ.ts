export function isValidCNPJ(possibleCNPJ: string) {
    if (typeof possibleCNPJ !== 'string' || possibleCNPJ.length < 14) return false;
    possibleCNPJ = possibleCNPJ.trim()
    possibleCNPJ = possibleCNPJ.replace(/[^\d]+/g, '');
    
    if (possibleCNPJ.length !== 14) return false;
  
    // Verificação dos dígitos verificadores
    const cnpjArray = possibleCNPJ.split('').map(Number);
    const validateDigit = (n: number) => {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        sum += cnpjArray[i] * (n + 1 - i);
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const digit1 = validateDigit(12);
    const digit2 = validateDigit(13);
  
    return cnpjArray[12] === digit1 && cnpjArray[13] === digit2;
  }