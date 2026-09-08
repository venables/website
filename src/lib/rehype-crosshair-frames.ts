import type { Element, Root } from "hast"

import { crosshairMarks } from "./crosshair-marks"

/**
 * Rehype plugin that wraps post images in a crosshair frame: four blueprint
 * corner marks matching the framed sections used across the site. Images become
 * `<span class="image-frame">`. Styling lives in globals.css (.image-frame,
 * .crosshair-mark). Code blocks are framed via pure CSS in globals.css instead
 * (Astro's build strips block wrappers injected around highlighted <pre>).
 */

function frameImage(img: Element): Element {
  return {
    type: "element",
    tagName: "span",
    properties: { className: ["image-frame"] },
    children: [img, ...crosshairMarks()]
  }
}

function visit(node: Root | Element): void {
  const { children } = node
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.type !== "element") {
      continue
    }
    if (child.tagName === "img") {
      children[i] = frameImage(child)
    } else {
      visit(child)
    }
  }
}

export default function rehypeCrosshairFrames() {
  return (tree: Root): void => {
    visit(tree)
  }
}
