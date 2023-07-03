
// import { ta } from "date-fns/locale";
import { TagController } from "/home/orotel/dev/gtrinvestimentos-api/src/modules/tag/infra/express/tagController.ts"

const allTags = [
  'terreno', 'log', 'comercial', 'corporativo', 'alto_padrao', 'residencial', 'lotes', 'vertical', 'horizontal', 'locação',
  'ativo_renda', 'cri', 's&lb', 'cra', 'bts', 'credito', 'debenture',
  'm&a', 'shopping', 'hotel', 'hospital', 'industria', 'distribuidora', 'varejo', 'serviços', 'infraestrutura', 'educação', 'supermercado', 'alimentos', 'textil', 'saude', 'farmacia', 'agro', 'pet', 'vestuario',
  'Energia', 'saneamento', 'telecomunicacoes', 'tecnologia'
];
export function createTags (req,res){ 

  allTags.forEach(tag =>{
    const objTag = 
    {
      label:tag
    }

    TagController.create(objTag)
    res.send(objTag)
    
  })
}