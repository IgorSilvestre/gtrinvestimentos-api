import { AppError } from "../../../../shared/AppError"
import { errorMessageKeys } from "../../../../shared/keys/errorMessageKeys"
import { CompanyService } from "../companyService"

export async function registerEmployee (employeeId: string, companyId: string): Promise<true | AppError> {
    try {
        const company = await CompanyService.getById(companyId)
        if (company instanceof AppError) {
            throw Error(errorMessageKeys.company.cantGetCompany)
        }
        const updatedCompanyEmployees: any = {
            employees:
                company.employees && company.employees.length > 0
                    ? [...company.employees, employeeId]
                    : [employeeId],
        }
        await CompanyService.update(companyId, updatedCompanyEmployees)
    } catch (err) {
        return new AppError({
            clientMessage: errorMessageKeys.company.cantRegisterEmployee,
            apiError: err,
        })
    }
    return true
}