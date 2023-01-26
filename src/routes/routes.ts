import { Router } from "express";
import { companyRouter } from "./appRoutes/company.routes";

export const routes = Router()

routes.get('/', (req, res) => res.status(200).send('UP'))

routes.use('/company', companyRouter)