import { ZPerson } from '../../modules/person/interfaces-validation/ZPerson'
import { arrIncludeRegex } from '../utils/arrIncludeRegex'
import { formatPhoneNumber } from '../utils/formatPhoneNumber'
import { parseSheetToArrayOfObjects } from '../utils/parseSheetToObject'
import { parsePeople } from './parsePeople'

export async function parsePeopleFromSheet(): Promise<ZPerson[]> {
  const people: ZPerson[] = []
  parseSheetToArrayOfObjects('Pessoas').forEach((pessoa) => {
    const tags: string[] = []
    const addToTagsArr = []

    // Ajeitando os V na areaDeAtuacao
    for (let keyPessoa in pessoa) {
      const valueKeyPessoa = pessoa[keyPessoa]
      if (valueKeyPessoa !== 'V') continue

      const isMultipleTags = keyPessoa.split(',')
      isMultipleTags.length > 1
        ? addToTagsArr.push(...isMultipleTags)
        : addToTagsArr.push(keyPessoa)

      // console.log('AreaDeAtuação >>>', addToArrOfAreaAtuacao)
      addToTagsArr.forEach((columKey) => {
        if (!arrIncludeRegex(columKey, tags)) {
          tags.push(columKey)
        }
      })
    }

    // ajeitando nome
    if (pessoa.Nome && typeof pessoa.Nome == 'string')
      pessoa.Nome = pessoa.Nome.trim()

    // ajeitando empresa
    if (pessoa.empresa && typeof pessoa.empresa == 'string')
      pessoa.empresa = pessoa.empresa.trim()

    //ajeitando os emails
    const emails = []
    const { Email1, Email2 } = pessoa
    if (Email1 && typeof Email1 == 'string') emails.push(Email1.trim())
    if (Email2 && typeof Email2 == 'string') emails.push(Email2.trim())
    pessoa.emails = emails

    //ajeitando os telefones
    const telefones = []
    const { Telefone1, Telefone2 } = pessoa
    if (Telefone1 && typeof Telefone1 == 'string')
      telefones.push(formatPhoneNumber(Telefone1.trim()))
    if (Telefone2 && typeof Telefone2 == 'string')
      telefones.push(formatPhoneNumber(Telefone2.trim()))
    pessoa.telefones = telefones

    // ajeitando a Tags
    if (tags.includes('undefined')) tags.splice(tags.indexOf('undefined'), 1)
    pessoa.tags = tags

    people.push(parsePeople(pessoa))
  })
  return people
}
