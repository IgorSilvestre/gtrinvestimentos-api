import XLSX from 'xlsx'

export function sheetToObject (abaName){
  const workbook = XLSX.readFile("/home/orotel/dev/scripts/scripts/data.xlsx");
  const worksheet = workbook.Sheets[abaName];
  return  XLSX.utils.sheet_to_json(worksheet)
}
