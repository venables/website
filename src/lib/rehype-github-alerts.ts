import type { Element, ElementContent, Root } from "hast"

import { crosshairMarks } from "./crosshair-marks"

/**
 * Rehype plugin that turns GitHub-style alert blockquotes into crosshair-framed
 * callouts. A blockquote whose first line is `[!NOTE]` (or TIP, IMPORTANT,
 * WARNING, CAUTION) becomes `<aside class="callout callout--note">` with a mono
 * label in place of the marker. Styling lives in globals.css (.callout).
 */

const alertTypes = ["note", "tip", "important", "warning", "caution"] as const

type AlertType = (typeof alertTypes)[number]

const labels: Record<AlertType, string> = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution"
}

/**
 * GitHub wants the marker alone on the blockquote's first line, but the
 * markdown formatter reflows prose and pulls the body up onto that line, so any
 * whitespace (or none, at the end of a paragraph) separates marker from body.
 */
const markerPattern = /^\[!(note|tip|important|warning|caution)\](?:\s+|$)/i

function isAlertType(value: string): value is AlertType {
  return alertTypes.some((type) => type === value)
}

function alertTypeOf(paragraph: Element): AlertType | undefined {
  const [first] = paragraph.children
  if (first?.type !== "text") {
    return undefined
  }
  const marker = markerPattern.exec(first.value)?.[1]?.toLowerCase()
  return marker && isAlertType(marker) ? marker : undefined
}

/**
 * The marker shares its paragraph with the alert body unless a blank line
 * separates them, so strip it rather than dropping the paragraph. A
 * marker-only paragraph leaves nothing behind.
 */
function withoutMarker(paragraph: Element): Element | undefined {
  const [first, ...rest] = paragraph.children
  if (first?.type !== "text") {
    return paragraph
  }
  const body = first.value.replace(markerPattern, "")
  if (body === "") {
    return rest.length === 0 ? undefined : { ...paragraph, children: rest }
  }
  return { ...paragraph, children: [{ ...first, value: body }, ...rest] }
}

function label(type: AlertType): Element {
  return {
    type: "element",
    tagName: "p",
    properties: { className: ["callout-label"] },
    children: [{ type: "text", value: labels[type] }]
  }
}

function callout(type: AlertType, content: ElementContent[]): Element {
  return {
    type: "element",
    tagName: "aside",
    properties: { className: ["callout", `callout--${type}`] },
    children: [label(type), ...content, ...crosshairMarks()]
  }
}

function toCallout(blockquote: Element): Element | undefined {
  const start = blockquote.children.findIndex(
    (child) => child.type === "element"
  )
  const first = blockquote.children[start]
  if (first?.type !== "element" || first.tagName !== "p") {
    return undefined
  }
  const type = alertTypeOf(first)
  if (!type) {
    return undefined
  }
  const body = withoutMarker(first)
  const rest = blockquote.children.slice(start + 1)
  return callout(type, body ? [body, ...rest] : rest)
}

function visit(node: Root | Element): void {
  const { children } = node
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.type !== "element") {
      continue
    }
    if (child.tagName === "blockquote") {
      const converted = toCallout(child)
      if (converted) {
        children[i] = converted
        visit(converted)
        continue
      }
    }
    visit(child)
  }
}

export default function rehypeGithubAlerts() {
  return (tree: Root): void => {
    visit(tree)
  }
}
