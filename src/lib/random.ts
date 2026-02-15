/**
 * Pick a random element from an array.
 */
export function pickRandom<T>(items: readonly T[]): T {
  const index = Math.floor(Math.random() * items.length)
  return items[index] as T
}

/**
 * Set the text content of an element to a random item from the list.
 *
 * @param id - The element ID to target
 * @param items - The list of possible text values
 */
export function randomizeText(id: string, items: readonly string[]): void {
  const el = document.getElementById(id)
  if (el) {
    el.textContent = pickRandom(items)
  }
}
