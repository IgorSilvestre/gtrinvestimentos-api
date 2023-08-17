import { arrIncludeRegex } from '../utils/arrIncludeRegex'
import { formatPhoneNumber } from '../utils/formatPhoneNumber'
import { parseSheetToArrayOfObjects } from '../utils/parseSheetToObject'
import { IPersonSheet } from './IPersonSheet'
import { normalizedPeople } from './parsePeople'

export async function parsePeopleFromSheet(): Promise<IPersonSheet[]> {
  const people: IPersonSheet[] = []
  parseSheetToArrayOfObjects('Pessoas').forEach((pessoa) => {
    const areaAtuacao = ('' + pessoa.AreaAtuacao).split(',')
    const addToArrOfAreaAtuacao = []

    // Ajeitando os V na areaDeAtuacao
    for (let keyPessoa in pessoa) {
      const valueKeyPessoa = pessoa[keyPessoa]
      if (valueKeyPessoa !== 'V') continue

      const isMultipleTags = keyPessoa.split(',')
      if (isMultipleTags.length > 1) {
        addToArrOfAreaAtuacao.push(...isMultipleTags)
      } else {
        addToArrOfAreaAtuacao.push(keyPessoa)
      }

      // console.log('AreaDeAtuação >>>', addToArrOfAreaAtuacao)
      addToArrOfAreaAtuacao.forEach((columKey) => {
        if (!arrIncludeRegex(columKey, areaAtuacao)) {
          areaAtuacao.push(columKey)
        }
      })
    }

    // ajeitando nome
    if(pessoa.Nome && typeof pessoa.Nome == 'string') pessoa.Nome = pessoa.Nome.trim()

    // ajeitando empresa
    if (pessoa.empresa && typeof pessoa.empresa == 'string') pessoa.empresa = pessoa.empresa.trim()

    //ajeitando os emails
    const emails = []
    const { Email1, Email2 } = pessoa
    if (Email1 && typeof Email1 == 'string') emails.push(Email1.trim())
    if (Email2 && typeof Email2 == 'string') emails.push(Email2.trim())
    pessoa.emails = emails

    //ajeitando os telefones
    const telefones = []
    const { Telefone1, Telefone2 } = pessoa
    if (Telefone1 && typeof Telefone1 == 'string') telefones.push(formatPhoneNumber(Telefone1.trim()))
    if (Telefone2 && typeof Telefone2 == 'string') telefones.push(formatPhoneNumber(Telefone2.trim()))
    pessoa.telefones = telefones

    // ajeitando a AreaAtuacao
    if (areaAtuacao.includes('undefined'))
      areaAtuacao.splice(areaAtuacao.indexOf('undefined'), 1)

    people.push(normalizedPeople(pessoa))
  })
  return people
}
