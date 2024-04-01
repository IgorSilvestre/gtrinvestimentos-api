export function capitalizeFirstLetters(str: string): string {
  str = str.trim() // Remove leading and trailing whitespace
  // Split the string into separate words
  const words = str.split(' '); 

  // Process each word individually
  const capitalizedWords = words.map(word => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the capitalized words back into a string with spaces
  return capitalizedWords.join(' '); 
}