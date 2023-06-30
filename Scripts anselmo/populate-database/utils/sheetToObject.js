import XLSX from 'xlsx'

export function sheetToObject (abaName){
  const workbook = XLSX.readFile("/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/utils/data 2.xlsx");
  const worksheet = workbook.Sheets[abaName];
  return  XLSX.utils.sheet_to_json(worksheet)
}
