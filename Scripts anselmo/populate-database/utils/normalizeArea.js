export function areaToArray (area) {
  if (typeof area !== 'string') return []
  let a = area
    .replace(/\s/g, '')
    .split(',')
    .filter(element => element !== '');

  return a
}
