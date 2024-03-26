import { Request, Response } from "express"
import { AppError } from "../../../../../shared/AppError"
import { demandValidation, ZDemand } from "../../../interfaces-validation/ZDemand"
import { DemandService } from "../../../service/demandService"

export async function create(req: Request, res: Response) {
    const demandDTO = req.body as ZDemand
  
    const validatedDemandDTO = demandValidation.safeParse(demandDTO)
    if (!validatedDemandDTO.success) {
      return res.status(422).json(validatedDemandDTO.error.errors)
    }
  
    const demand: ZDemand | AppError = await DemandService.create(demandDTO)
  
    if (demand instanceof AppError) {
      return res.status(demand.status).json({ error: demand.message })
    }
    return res.status(201).json(demand as ZDemand)
  }