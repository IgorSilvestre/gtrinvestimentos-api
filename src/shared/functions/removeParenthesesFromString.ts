export function removeParenthesesFromString(str: string): string {
  return str.replace(/[()]/g, '');
}