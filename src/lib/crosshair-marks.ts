import type { Element } from "hast"

/**
 * The four blueprint corner marks shared by the rehype plugins that build
 * crosshair frames. Styling lives in globals.css (.crosshair-mark).
 */

const corners = ["tl", "tr", "bl", "br"] as const

function mark(corner: (typeof corners)[number]): Element {
  return {
    type: "element",
    tagName: "span",
    properties: {
      className: ["crosshair-mark", `crosshair-mark--${corner}`],
      "aria-hidden": "true"
    },
    children: []
  }
}

export function crosshairMarks(): Element[] {
  return corners.map(mark)
}
