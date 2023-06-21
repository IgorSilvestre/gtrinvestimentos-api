import {testRegex} from '/home/orotel/dev/scripts/scripts/populate-database/utils/regexForStringSearch.js'

/**
 * 
 * @param {string} word - palavra que deseja verificar se esta dentro do array 
 * @param {Array} arr - array do qual quer verificar se possui a palavra
 * @returns {Boolean} - Verdadeiro se array possui a palavra
 */

export function arrIncludeRegex (word,arr){
  if(!arr) return false
  return arr.some(testWord => testRegex(word, testWord));
}
