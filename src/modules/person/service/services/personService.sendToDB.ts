import { AppError } from '../../../../shared/AppError'
import { IPersonSheet } from '../../../../tableScripts/people/IPersonSheet'
import { parsePeopleFromSheet } from '../../../../tableScripts/people/people'
import { CompanyRepository } from '../../../company/infra/mongo/repository/CompanyRepository'
import { ZCompany } from '../../../company/interfaces-validation/ZCompany'

export async function sendToDB() {
  const people: IPersonSheet[] = await parsePeopleFromSheet()
  for (const person of people) {
    // const { Nome, empresa, emails, telefones, areaAtuacao, target } =
    //   people[person]
    // console.log('Nome: ', Nome)
    // console.log('empresa: ', empresa)
    // console.log('emails: ', emails)
    // console.log('telefones: ', telefones)
    // console.log('areaAtuacao: ', areaAtuacao)
    // console.log('target: ', target)
    // console.log('-----------------------')
    console.log('person.empresa', person.empresa)
    const company: ZCompany | AppError = await CompanyRepository.search(
      { query: person.empresa },
      true,
    )
    if (company instanceof AppError) console.log(company.message)
    else {
      console.log('companyID', company._id)
      person.empresa = company?._id
    }
  }

  return people
}
