// import { ta } from "date-fns/locale";

import { Request, Response } from 'express'
import { TagService } from '../../modules/tag/service/tagService'

const allTags = [
  'terreno',
  'log',
  'comercial',
  'corporativo',
  'alto_padrao',
  'residencial',
  'lotes',
  'vertical',
  'horizontal',
  'locação',
  'ativo_renda',
  'cri',
  's&lb',
  'cra',
  'bts',
  'credito',
  'debenture',
  'm&a',
  'shopping',
  'hotel',
  'hospital',
  'industria',
  'distribuidora',
  'varejo',
  'serviços',
  'infraestrutura',
  'educação',
  'supermercado',
  'alimentos',
  'textil',
  'saude',
  'farmacia',
  'agro',
  'pet',
  'vestuario',
  'Energia',
  'saneamento',
  'telecomunicacoes',
  'tecnologia',
]

export async function createTags(req: Request, res: Response) {
  const createdTags = await Promise.all(allTags.map(async tag =>
    TagService.create({
      label: tag
    }),
  ))

  res.send(createdTags)

}
