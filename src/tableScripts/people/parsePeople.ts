import { ZPerson } from '../../modules/person/interfaces-validation/ZPerson'
import { IPersonSheet } from './IPersonSheet'

export function normalizedPeople(person: IPersonSheet) {
  let obj: ZPerson = {}

  if (person.Nome) obj.name = person.Nome
  if (person.empresa) obj.company = person.empresa
  if (person.emails && person.emails.length > 0) {
    if (person.emails[1].length > 1) obj.email = person.emails[1]
    if (person.emails[0].length > 1) obj.email = person.emails[0]
  }
  // if (person.telefones) obj.telefones = person.telefones
  if (person.tags) obj.tags = person.tags
  if (person.target) obj.target = person.target

  return obj
}
