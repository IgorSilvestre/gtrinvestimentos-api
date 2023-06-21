import  junior  from '../utils/arrIncludeRegex';

  export default function filterArea (arrAreaBeforTest) {
    let TratedCompanyArea = []
    const arrArea = [
      "terreno", "log", "comercial", "corporativo", "alto_padrao", "residencial", "lotes", 
      "vertical", "horizontal", "locacao", "ativo_renda", "cri", "s&lb", "cra", "bts", "credito", 
      "debenture", "m&a", "energia", "shopping", "hotel", "hospital", "industria", "distribuidora", 
      "varejo", "servicos", "infraestrutura", "tecnologia", "educacao", "supermercado", "alimentos", 
      "textil", "saude", "farmacia", "agro", "pet", "vestuario"
    ]
    arrAreaBeforTest.forEach(word=> {
      if(!arrIncludeRegex(word,arrArea)){
        arrAreaBeforTest.pop()
      }
    })
    return TratedCompanyArea = arrAreaBeforTest
  }
