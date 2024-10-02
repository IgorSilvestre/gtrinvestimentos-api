import { removeAccents } from 'br-lib'

export function createBusinessEmailPermutations(fullName: string, domain: string): string[] {
  // split full name into array of names
  const names = removeAccents(fullName.trim().toLowerCase()).split(' ')
  domain = domain.trim().toLowerCase()

  // get first name
  const firstName = names[0]

  // get family names
  const familyNames = names.length > 1 ? names.slice(1) : []
  const lastName = familyNames[familyNames.length - 1]

  // create all possible permutations
  const emailPermutations: string[] = []

  // Possible email formats
  // 1. firstname@domain 
  emailPermutations.push(firstName + '@' + domain)
  // 2. flastname@domain
  emailPermutations.push(...familyNames.map((familyName: string) => firstName[0] + familyName + '@' + domain))
  // 3. firstname.lastname@domain
  emailPermutations.push(firstName + '.' + lastName + '@' + domain)
  // 4. lastname.firstname@domain
  emailPermutations.push(...familyNames.map((familyName: string) => familyName + '.' + firstName + '@' + domain))
  // 5. lastname@domain
  emailPermutations.push(...familyNames.map((familyName: string) => familyName + '@' + domain))
  // 6. firstnamelastname@domain
  emailPermutations.push(...familyNames.map((familyName: string) => firstName + familyName + '@' + domain))
  // 7. lastnamefirstname@domain
  emailPermutations.push(...familyNames.map((familyName: string) => familyName + firstName + '@' + domain))
  // 8. f.lastname@domain
  emailPermutations.push(firstName[0] + '.' + lastName + '@' + domain)
  // 9. f_lastname@domain
  emailPermutations.push(firstName[0] + '_' + lastName + '@' + domain)
  // 10. l.firstname@domain
  emailPermutations.push(lastName[0] + '.' + firstName + '@' + domain)
  // 11. fistname + first letter of every family name@domain
  emailPermutations.push(firstName + familyNames.map((name: string) => name[0]).join('') + '@' + domain)
  // 12. fistname-first letter of family name @domain
  emailPermutations.push(firstName + '-' + lastName[0] + '@' + domain)

  return emailPermutations
}

