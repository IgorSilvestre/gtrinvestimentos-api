import { ZCompany } from "./ZCompany";

export function parseCompaniesForSelect (companies: ZCompany[]) {
    return companies.map((company) => ({
        value: company._id,
        label: company.name
    }))
}
