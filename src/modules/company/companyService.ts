import { CompanyRepository } from "./infra/mongo/companyRepository";
import { ZCompany } from "./interfaces-validation/companyValidation";

export const CompanyService = {
    store: async (companyDTO: ZCompany): Promise<ZCompany> => {
        try {
            return await CompanyRepository.create(companyDTO)
        } catch (err) {
            throw err
        }
    }
}
