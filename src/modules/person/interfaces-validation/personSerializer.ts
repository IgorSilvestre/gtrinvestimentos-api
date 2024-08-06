import { normalizeTags } from '../../../shared/functions/normalizeTags'
import { parseISODateToBrazilSTD } from '../../../shared/functions/parseISODateToBrazilSTD'
import { ZTag } from '../../tag/interfaces-validation/ZTag'
import { ZPersonModel } from '../infra/mongo/personSchema'

export function serializePerson(personOrPeople: ZPersonModel | ZPersonModel[]) {
  let peopleSerialized
  if (Array.isArray(personOrPeople)) {
    peopleSerialized = personOrPeople.map((person) => ({
      ...person.toObject(),
      tags: normalizeTags(person.tags as unknown as ZTag[]),
      createdAt: parseISODateToBrazilSTD(person?.createdAt?.toISOString()),
      lastUpdated: parseISODateToBrazilSTD(person?.lastUpdated?.toISOString()),
    }))
  } else {
    peopleSerialized = {
      ...personOrPeople.toObject(),
      tags: normalizeTags(personOrPeople.tags as unknown as ZTag[]),
      createdAt: parseISODateToBrazilSTD(
        personOrPeople?.createdAt?.toISOString(),
      ),
      lastUpdated: parseISODateToBrazilSTD(
        personOrPeople?.lastUpdated?.toISOString(),
      ),
    }
  }
  return peopleSerialized
}
