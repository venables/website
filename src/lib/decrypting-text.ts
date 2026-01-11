/**
 * Credit: https://github.com/stevedylandev/stevedsimkins-dev-astro/blob/main/src/components/DecryptingHeader.astro
 */
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

export function decrypt(element: Element) {
  const text = element.getAttribute("data-text") ?? ""
  const totalDuration = 1000 // 1.5 seconds
  const intervalDuration = 30 // Update every 30ms
  const steps = totalDuration / intervalDuration

  let step = 0
  const intervalId = setInterval(() => {
    if (step < steps) {
      element.textContent = text
        .split("")
        .map((char, index) => {
          if (index < (step / steps) * text.length) {
            return char
          }
          return characters[Math.floor(Math.random() * characters.length)]
        })
        .join("")
      step++
    } else {
      clearInterval(intervalId)
      element.textContent = text
    }
  }, intervalDuration)

  return intervalId // Return the interval ID for cleanup
}
