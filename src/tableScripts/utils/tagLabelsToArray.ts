import { removeParenthesesFromString } from "../../shared/functions/removeParenthesesFromString";
import { removeSpecialCharactersFromString } from "../../shared/functions/removeSpecialCharactersFromString";

export function tagLabelsToArray (tagLabels: string): string[] {
  if (typeof tagLabels !== 'string') return []
  
  let tagLabelsArray: string[] = tagLabels
    .replace(/\s/g, '')
    .split(',')
    .filter(element => element !== '')

  return tagLabelsArray.map( (tagLabel: string) => {
    tagLabel = removeParenthesesFromString(tagLabel)
    tagLabel = removeSpecialCharactersFromString(tagLabel)
    return tagLabel
  })
}
