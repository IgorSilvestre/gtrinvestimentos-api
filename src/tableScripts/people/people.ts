import { parseSheetToArrayOfObjects } from '/home/user/ff/gtrinvestimentos-api/src/tableScripts/utils/parseSheetToObject.ts'
import { arrIncludeRegex } from '/home/user/ff/gtrinvestimentos-api/src/tableScripts/utils/arrIncludeRegex.ts'
import { normalizedPeople } from '/home/user/ff/gtrinvestimentos-api/src/tableScripts/people/parsePeople.ts'
import { formatPhoneNumber } from '/home/user/ff/gtrinvestimentos-api/src/tableScripts/utils/formatPhoneNumber.ts'

export async function sendPeopleToDB(req: Request, res: Response) {
  const people = []
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

    //ajeitando os emails
    const emails = []
    const { Email1, Email2 } = pessoa
    if (Email1) emails.push(Email1)
    if (Email2) emails.push(Email2)

    //ajeitando os telefones
    const telefones = []
    const { Telefone1, Telefone2 } = pessoa
    if (Telefone1) telefones.push(formatPhoneNumber(Telefone1))
    if (Telefone2) telefones.push(formatPhoneNumber(Telefone2))

    // ajeitando a AreaAtuacao
    if(areaAtuacao.includes('undefined')) areaAtuacao.splice(areaAtuacao.indexOf('undefined'), 1)

    // criando objFormatado
    const { Nome, empresa, target } = pessoa

    people.push(
      normalizedPeople(
        Nome,
        empresa,
        emails.length > 0 ? emails : undefined,
        telefones.length > 0 ? telefones : undefined,
        areaAtuacao.length > 0 ? areaAtuacao : undefined,
        target,
      ),
    )
  })
  res.status(200).json(people)
}
