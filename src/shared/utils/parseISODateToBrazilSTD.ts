const { parseISO, format } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');

export function parseISODateToBrazilSTD (dataISO: string | undefined) {
  if (!dataISO) return 'Registro sem data';
  const data = parseISO(dataISO);
  const dataGMTMinus3 = utcToZonedTime(data, 'America/Sao_Paulo');
  return format(dataGMTMinus3, 'dd/MM/yyyy HH:mm:ss');
}
