
import { CompanyService } from '../../../src/modules/company/service/companyService'



export async function parseSheetCompanies(request,response){
  const obj = {
    "name":"kinea",
  }
    const criar = await CompanyService.create(obj)
    console.log('CRIAR', criar)
    response.send(criar)

}