export function removeParentheses(str) {
  return str.replace(/[()]/g, '');
}

export function removeSpecialCharactersAndSpaces(str) {
  return str.replace(/[^\w\s()]/gi, '').replace(/\s+/g, '');
}