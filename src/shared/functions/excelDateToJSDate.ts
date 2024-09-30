export function excelDateToJSDate(excelDate: number) {
  // Excel starts counting from Jan 1, 1900, so we adjust from that
  const excelStartDate = new Date(1900, 0, 1);
  
  // Subtract 1 because Excel mistakenly thinks 1900 was a leap year
  const daysOffset = excelDate - 1;
  
  // Add the days as milliseconds (days * 86400 seconds/day * 1000 ms/second)
  const jsDate = new Date(excelStartDate.getTime() + daysOffset * 86400 * 1000);
  
  return jsDate;
}

