import XLSX from 'xlsx'

export function parseSheetToArrayOfObjects (tabName: string): any[] {
  const workbook = XLSX.readFile("/Users/igorsilvestre/Documents/dev/github-repos/gtrinvestimentos-api/src/tableScripts/utils/companySheet.xlsx");
  const worksheet = workbook.Sheets[tabName];
  return  XLSX.utils.sheet_to_json(worksheet)
}
