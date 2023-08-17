import { IPersonSheet } from './IPersonSheet'

export function normalizedPeople(person: IPersonSheet) {
  let obj: IPersonSheet = {}

  if (person.Nome) obj.Nome = person.Nome
  if (person.empresa) obj.empresa = person.empresa
  if (person.emails) obj.emails = person.emails
  if (person.telefones) obj.telefones = person.telefones
  if (person.areaAtuacao) obj.areaAtuacao = person.areaAtuacao
  if (person.target) obj.target = person.target

  return obj
}
