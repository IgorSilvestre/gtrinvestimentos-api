import { Request, Response } from 'express';
import { externalAPIService } from '../../../service/externalAPIService';
import whois from 'whois-json'
import { isValidCNPJ } from '../../../../../shared/functions/isValidCNPJ';

export async function deepSearchCompany(req: Request, res: Response) {
  const { domain } = req.params;

  if (!domain) {
      return res.status(400).json({ error: 'No url provided' })
  }

  let companyCNPJ: string | undefined;
  try {
    const whoisData: { ownerid: string } = await whois(domain) as any
    companyCNPJ = isValidCNPJ(whoisData.ownerid) ? whoisData.ownerid : undefined
  } catch (err) {
    console.log(err)
  }

  try {
      const [ linkedinCompanyDataByDomain, CNPJData ] = await Promise.allSettled([
          externalAPIService.fetchLinkedinCompanyDataByDomain(domain),
          companyCNPJ ? externalAPIService.fetchCNPJData(companyCNPJ) : undefined
      ])

      res.status(200).json({
        linkedinData: linkedinCompanyDataByDomain.status === 'fulfilled' ? linkedinCompanyDataByDomain.value : undefined,
        CNPJData: CNPJData.status === 'fulfilled' ? CNPJData.value : undefined
      })

  } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Error ao realizar companyDeepSearch' });
  }
}
