import { Router } from "express"
import { externalApiControllerV2 } from "../../../../modules/externalAPI/infra/express/externalApiControllerV2"

export const externalAPIRouterV2 = Router()

externalAPIRouterV2.get(
  '/fetch-cnpj-data/:cnpj',
  externalApiControllerV2.fetchCNPJDataV2,
)

