/**
 * Capitalizes the first letter of a string and makes the rest lowercase
 * @param str - The input string to capitalize
 * @returns The string with first letter capitalized and rest lowercase
 */
export function capitalize(str: string): string {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
