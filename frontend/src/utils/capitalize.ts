/**
 * Capitalizes the first character of a word.
 *
 * @param word - The word to capitalize.
 * @returns The capitalized word.
 */
export function capitalizeFirstCharacter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}