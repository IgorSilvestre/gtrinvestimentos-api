
export function normalizedPeople(Nome,Empresa,emails,telefones,areaAtuacao,target){ 

  let obj = {};
  if (Nome) {
    obj.Nome = Nome;
  }
  if (Empresa) {
    obj.Empresa = Empresa;
  }
  if (emails) {
    obj.emails = emails;
  }
  if (telefones) {
    obj.telefones = telefones;
  }
  if (areaAtuacao) {
    obj.areaAtuacao = areaAtuacao;
  }
  if (target) {
    obj.target = target;
  }
  return obj;

  }
