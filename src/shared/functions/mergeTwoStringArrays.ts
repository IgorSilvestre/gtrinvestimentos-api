/**
 * 
 * @returns array of unique elements from both arrays
 */
export function mergeTwoStringArrays(
  arr1: string[] | undefined,
  arr2: string[] | undefined,
): string[] | undefined {
  if (arr1 && arr2) {
    const mergedArrs = [...arr1, ...arr2]
    const uniqueElements = mergedArrs.filter(
      (element, index) => mergedArrs.indexOf(element) === index,
    )
    return uniqueElements
  }

  if (arr1) return arr1
  if (arr2) return arr2
  return undefined
}
