import { AppError } from '../../../../shared/AppError'
import { IPersonSheet } from '../../../../tableScripts/people/IPersonSheet'
import { parsePeopleFromSheet } from '../../../../tableScripts/people/people'
import { arrIncludeRegex } from '../../../../tableScripts/utils/arrIncludeRegex'
import { CompanyRepository } from '../../../company/infra/mongo/repository/CompanyRepository'
import { ZCompany } from '../../../company/interfaces-validation/ZCompany'
import { TagRepository } from '../../../tag/infra/mongo/repository/TagRepository'
import { ZTag } from '../../../tag/interfaces-validation/ZTag'
import { ZPerson } from '../../interfaces-validation/ZPerson'
import { PersonService } from '../personService'

export async function sendToDB() {
  const people: ZPerson[] = await parsePeopleFromSheet()
  const tags: ZTag[] | AppError = await TagRepository.getAll()
  const createdPeople: ZPerson[] = []

  for (const person of people) {

    // NAME
    if (!person.name || person.name.length < 1) continue
    
    // COMPANY
    try {
    if (person.company !== undefined) {
        const company: ZCompany[] | AppError = await CompanyRepository.search({
          query: person.company?.trim(),
        }, true)
        if (company instanceof AppError) throw console.log(company.message)
        if (company.length > 1) {
          console.log('MULTIPLE RESULTS - ', person.company, company.length)
          console.log('-------------------------------------------')
        } else if (company.length == 1) {
          person.company = company[0]._id
        }
      }
    } catch (error) {
      console.log(error)
    }

    // TAGS
    if (person.tags && person.tags?.length > 0) {
      if (tags instanceof AppError) throw tags.message
      const tagsIds: string[] = []
      for (const tag of tags) {
        if (arrIncludeRegex(tag?.label, person?.tags)) tagsIds.push(tag._id)
        // else console.log('NOT FOUND TAG', tag.label, person.tags)
      }
      person.tags = tagsIds
    }

    // RUN!!!
    try {
      const createdPerson: ZPerson | AppError = await PersonService.create(
        person,
      )
      if (createdPerson instanceof AppError && createdPerson.status === 409) console.log(createdPerson.message)
      else if (createdPerson instanceof AppError) console.log(createdPerson.message)
      else createdPeople.push(createdPerson)
    } catch (error) {
        console.log('ERROR', error)
    }
  }

  return people
}
