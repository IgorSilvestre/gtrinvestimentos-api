import { parseISODateToBrazilSTD } from '../../../shared/functions/parseISODateToBrazilSTD'
import { normalizeTags } from '../../tag/interfaces-validation/normalizeTags'
import { ZTag } from '../../tag/interfaces-validation/ZTag'
import { ZPersonModel } from '../infra/mongo/personSchema'


export function serializePerson(personOrPeople: ZPersonModel | ZPersonModel[]) {
  personOrPeople = Array.isArray(personOrPeople) ? personOrPeople : [personOrPeople]

  let peopleSerialized = personOrPeople.map((person) =>  ({
    ...person.toObject(),
    tags: normalizeTags(person.tags as unknown as ZTag[]),
    createdAt: parseISODateToBrazilSTD(person?.createdAt?.toISOString()),
    lastUpdated: parseISODateToBrazilSTD(person?.lastUpdated?.toISOString())
  }))

  return peopleSerialized
}
