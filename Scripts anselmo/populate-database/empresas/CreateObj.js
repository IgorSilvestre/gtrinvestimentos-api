
export function normalizedObj(companyName, companyArea, tese, descrição) {
  let obj = {};
  if (companyName) {
    obj.name = companyName;
  }
  if (companyArea) {
    obj.area = companyArea;
  }
  if (tese) {
    obj.teseInvestimento = tese;
  }
  if (descrição) {
    obj.descrição = descrição;
  }
  return obj;
}


