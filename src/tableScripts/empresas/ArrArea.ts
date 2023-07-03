import { availableTags } from "../stores";
import { arrIncludeRegex } from "../utils/arrIncludeRegex";

export function filterTagLabels(arrTagLabelsBeforeTagsFiltered: string[]) {
  if (!arrTagLabelsBeforeTagsFiltered) return
  
  const arrayWithoutDuplicates = [...new Set(arrTagLabelsBeforeTagsFiltered)];
  const filteredArrTagLabels = arrayWithoutDuplicates.filter(word => {
    return arrIncludeRegex(word ,availableTags)
  })
  return filteredArrTagLabels
}

