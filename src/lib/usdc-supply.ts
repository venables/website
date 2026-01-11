function formatNumber(num: number) {
  const billion = 1000000000
  const million = 1000000
  const thousand = 1000

  if (Math.abs(num) >= billion) {
    return `${(num / billion).toFixed(2).replace(/\.?0+$/, "")} billion`
  }

  if (Math.abs(num) >= million) {
    return `${(num / million).toFixed(2).replace(/\.?0+$/, "")} million`
  }

  if (Math.abs(num) >= thousand) {
    return `${(num / thousand).toFixed(2).replace(/\.?0+$/, "")} thousand`
  }

  return num.toString()
}

type ObjectWithKey<TKey extends string> = Record<TKey, unknown> &
  Record<string, unknown>

function isObjectWithKey<TKey extends string>(
  value: unknown,
  key: TKey
): value is ObjectWithKey<TKey> {
  return typeof value === "object" && value !== null && key in value
}

function parseSupply(json: unknown): string | null {
  if (
    isObjectWithKey(json, "ok") &&
    json.ok === true &&
    isObjectWithKey(json, "data") &&
    isObjectWithKey(json.data, "supply") &&
    isObjectWithKey(json.data.supply, "native") &&
    typeof json.data.supply.native === "number"
  ) {
    return `$${formatNumber(json.data.supply.native)}`
  }
  return null
}

export async function getSupply() {
  const fallback = "many billion dollars"

  try {
    const response = await fetch("https://api.stables.cool/tokens/USDC/supply")
    if (!response.ok) {
      throw new Error("Failed to fetch USDC supply")
    }

    const supply = parseSupply(await response.json())
    return supply ?? fallback
  } catch {
    return fallback
  }
}
