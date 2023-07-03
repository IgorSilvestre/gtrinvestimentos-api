import { testRegexForSearch } from "../../shared/functions/testRegexForSearch";

export function arrIncludeRegex (word: string, arr: string[]){
  if(!arr) return false
  return arr.some((testWord: string) => testRegexForSearch(word, testWord));
}
