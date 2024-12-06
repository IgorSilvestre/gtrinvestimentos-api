export function convertBase64ToObject(str: string) {
  return JSON.parse(atob(str))
}
