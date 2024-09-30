import * as XLSX from 'xlsx'

export function parseSheetToArrayOfObjects(buffer: Buffer, sheetName: string) {
  // Read the buffer as a workbook
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const worksheet = workbook.Sheets[sheetName]
  const jsonData = XLSX.utils.sheet_to_json(worksheet)
  
  return jsonData
}

