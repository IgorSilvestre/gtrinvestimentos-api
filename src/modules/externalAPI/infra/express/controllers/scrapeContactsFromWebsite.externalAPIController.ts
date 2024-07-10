import { Request, Response } from "express"
import { externalAPIService } from "../../../service/externalAPIService"

export async function scrapeContactsFromWebsite (Request: Request, Response: Response): Promise<Response> {
  const { domain } = Request.query

  if (!domain) {
    return Response.status(400).json({
      message: 'Domain is required',
    })
  }

  const contacts = await externalAPIService.scrapeContactsFromWebsite(domain as string)

  return Response.status(200).json(contacts)
}
