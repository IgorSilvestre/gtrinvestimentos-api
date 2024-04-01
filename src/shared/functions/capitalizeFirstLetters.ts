export function capitalizeFirstLetters(str: string): string {
  // Split the string into separate words
  const words = str.split(' '); 

  // Process each word individually
  const capitalizedWords = words.map(word => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the capitalized words back into a string with spaces
  return capitalizedWords.join(' '); 
}