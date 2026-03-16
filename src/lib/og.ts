import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { Resvg, initWasm } from "@resvg/resvg-wasm"
import satori from "satori"

let wasmInitialized = false

async function ensureWasm(): Promise<void> {
  if (wasmInitialized) return

  const wasmPath = join(
    process.cwd(),
    "node_modules/@resvg/resvg-wasm/index_bg.wasm"
  )
  const wasmBuffer = await readFile(wasmPath)
  await initWasm(wasmBuffer)
  wasmInitialized = true
}

const WIDTH = 1200
const HEIGHT = 630

const COLORS = {
  background: "#1a1f1c",
  foreground: "#f0f5f2",
  accent: "#2e3632",
  muted: "#7a8580"
} as const

export interface OgImageOptions {
  readonly title: string
  readonly author: string
  readonly avatarBase64: string
  readonly imageBase64?: string
}

export interface OgFont {
  readonly name: string
  readonly data: ArrayBuffer
  readonly weight: 400 | 700
  readonly style: "normal"
}

/**
 * Satori accepts React-element-like objects {type, props} at runtime,
 * but its TypeScript definitions only expose ReactNode. We define our
 * own element type and use a typed wrapper to bridge the gap.
 */
interface SatoriElement {
  readonly type: string
  readonly props: {
    readonly children?: string | SatoriElement | (string | SatoriElement)[]
    readonly style?: Record<string, unknown>
    readonly src?: string
    readonly width?: number
    readonly height?: number
  }
}

function renderSvg(
  element: SatoriElement,
  options: Parameters<typeof satori>[1]
) {
  // Satori documents the object format but types it as ReactNode
  return satori(element as Parameters<typeof satori>[0], options)
}

function getTitleFontSize(length: number): number {
  if (length > 60) return 42
  if (length > 40) return 52
  return 64
}

function buildFooter(author: string, avatarBase64: string): SatoriElement {
  return {
    type: "div",
    props: {
      children: [
        {
          type: "div",
          props: {
            children: "",
            style: {
              width: "100%",
              height: "3px",
              backgroundColor: COLORS.accent,
              marginBottom: "24px"
            }
          }
        },
        {
          type: "div",
          props: {
            children: [
              {
                type: "img",
                props: {
                  src: avatarBase64,
                  width: 44,
                  height: 44,
                  style: {
                    borderRadius: "50%",
                    border: `2px solid ${COLORS.accent}`
                  }
                }
              },
              {
                type: "div",
                props: {
                  children: [
                    {
                      type: "div",
                      props: {
                        children: author,
                        style: {
                          fontSize: 18,
                          fontWeight: 700,
                          color: COLORS.foreground
                        }
                      }
                    },
                    {
                      type: "div",
                      props: {
                        children: "venabl.es",
                        style: {
                          fontSize: 14,
                          fontWeight: 400,
                          color: COLORS.muted
                        }
                      }
                    }
                  ],
                  style: {
                    display: "flex",
                    flexDirection: "column"
                  }
                }
              }
            ],
            style: {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "14px"
            }
          }
        }
      ],
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }
    }
  }
}

function buildImagePanel(imageBase64: string): SatoriElement {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        position: "relative",
        flexShrink: 0,
        transform: "rotate(2deg)"
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "6px",
              left: "6px",
              right: "-6px",
              bottom: "-6px",
              backgroundColor: COLORS.foreground,
              transform: "skewX(-2deg)"
            }
          }
        },
        {
          type: "img",
          props: {
            src: imageBase64,
            width: 540,
            style: {
              objectFit: "contain",
              border: `3px solid ${COLORS.foreground}`
            }
          }
        }
      ]
    }
  }
}

function buildLayout(options: OgImageOptions): SatoriElement {
  const { title, author, avatarBase64, imageBase64 } = options

  const titleFontSize = getTitleFontSize(title.length)

  const titleElement: SatoriElement = {
    type: "div",
    props: {
      children: title,
      style: {
        fontSize: titleFontSize,
        fontWeight: 700,
        color: COLORS.foreground,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
        maxWidth: imageBase64 ? "680px" : "100%",
        wordBreak: "break-word"
      }
    }
  }

  const contentChildren: SatoriElement[] = imageBase64
    ? [titleElement, buildImagePanel(imageBase64)]
    : [titleElement]

  return {
    type: "div",
    props: {
      children: [
        {
          type: "div",
          props: {
            children: contentChildren,
            style: {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "40px",
              flex: 1,
              width: "100%"
            }
          }
        },
        buildFooter(author, avatarBase64)
      ],
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "60px",
        backgroundColor: COLORS.background,
        fontFamily: "JetBrains Mono"
      }
    }
  }
}

export async function generateOgImage(
  options: OgImageOptions,
  fonts: readonly OgFont[]
): Promise<ArrayBuffer> {
  await ensureWasm()

  const element = buildLayout(options)

  const svg = await renderSvg(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [...fonts]
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH }
  })

  const pngData = resvg.render().asPng()
  return new Uint8Array(pngData).buffer
}
