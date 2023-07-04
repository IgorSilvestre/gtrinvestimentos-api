
// export async function parseSheetCompanies (request,response){

//   const createdCompanies = await Promise.all(normalizedCompanies().map(async (company) => {
//     const createdCompanyOrError = await createCompany(company) 
//     if(createdCompanyOrError instanceof Error) return
//     return createdCompanyOrError
//   }))


//   response.status(201).json(createdCompanies)
// }