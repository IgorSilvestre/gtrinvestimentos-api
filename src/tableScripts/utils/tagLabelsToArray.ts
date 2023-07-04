import { removeParenthesesFromString } from "../../shared/functions/removeParenthesesFromString";

export function tagLabelsToArray (tagLabels: string): string[] {
  if (typeof tagLabels !== 'string') return []
  
  let tagLabelsArray: string[] = tagLabels
    .replace(/\s/g, '')
    .split(',')
    .filter(element => element !== '')

  return tagLabelsArray.map( (tagLabel: string) => {
    tagLabel = removeParenthesesFromString(tagLabel)
    tagLabel = tagLabel.replace(/[^\w\s&]/g, '').replace(/\s+/g, ''); // remove special characters and whitespaces except &
    return tagLabel
  })
}
