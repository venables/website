/**
 * Build the canonical URL for a page without a trailing slash.
 *
 * The build output format (`file`) leaves a `.html` suffix on `Astro.url`
 * (and the home page resolves to `/index.html`), while `directory` output
 * adds a trailing slash. All three are normalized away here so the canonical
 * always points at the clean, slash-less version of the path. The site root
 * collapses back to "/".
 */
export function canonicalUrl(pathname: string, site: URL | undefined): string {
  const cleaned = pathname
    .replace(/\.html$/, "")
    .replace(/\/index$/, "")
    .replace(/\/+$/, "")
  const path = cleaned === "" ? "/" : cleaned
  return new URL(path, site).href
}
