import Link from "next/link"

const PROJECTS = [
  {
    description: "on-chain analytics for the USDC stablecoin",
    name: "usdc.cool",
    url: "https://usdc.cool"
  },
  {
    description: "find the best workout music for your run",
    name: "jog.fm",
    url: "https://jog.fm"
  },
  {
    description: "type a song, bet the bpm",
    name: "songbpm",
    url: "https://songbpm.com"
  },
  {
    description: "cross-chain stablecoin analytics",
    name: "stablewars",
    url: "https://stablewars.xyz"
  },
  {
    description: "type-safe routes for next.js",
    name: "typed-route-handler",
    url: "https://github.com/venables/typed-route-handler"
  },
  {
    description: "starter kits for your next project",
    name: "startkit",
    url: "https://github.com/startkit-dev"
  },
  {
    description: "github profiles in the command line",
    name: "npx hello",
    url: "https://github.com/hello-js/hello"
  }
]

const WORK = [
  {
    name: "catena labs",
    status: "current",
    url: "https://catena.xyz"
  },
  {
    name: "m2 labs",
    url: "https://m2.xyz"
  },
  {
    name: "vested",
    url: "https://vested.co"
  },
  {
    name: "circle",
    url: "https://circle.com"
  },
  {
    name: "brightcove",
    url: "https://brightcove.com"
  },
  {
    name: "cantina",
    url: "https://cantina.co"
  },
  {
    name: "busradio",
    url: "#"
  },
  {
    name: "rocket software",
    url: "https://www.rocketsoftware.com"
  }
]

export default function Home() {
  return (
    <main className="flex grow flex-col items-start justify-start gap-8">
      <div className="flex flex-col">
        <h2 className="text-lg tracking-tighter">about</h2>
        <p className="py-4 text-sm">
          i am a product-focused engineer, entrepreneur, advisor, and angel
          investor building{" "}
          <span className="underline decoration-dotted underline-offset-8">
            intuitively obvious
          </span>{" "}
          products.
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg tracking-tighter">projects</h2>
        <ol className="space-y-4 py-4 text-sm">
          {PROJECTS.map(({ name, url, description }) => (
            <li key={url} className="grid items-start gap-1">
              <Link
                className="flex items-center gap-1.5 no-underline"
                href={url}
              >
                <span className="font-medium underline underline-offset-4 ">
                  {name}
                </span>
              </Link>
              <span className="text-sm text-foreground">{description}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col">
        <h2 className="text-lg tracking-tighter">work</h2>
        <ol className="space-y-4 py-4 text-sm">
          {WORK.map(({ name, url, status }) => (
            <li key={url} className="grid items-start gap-1">
              <Link
                className="flex items-center gap-1.5 no-underline"
                href={url}
              >
                <span className="font-medium underline underline-offset-4 ">
                  {name}
                </span>
                {status ? (
                  <>
                    &ndash;
                    <span className="text-xs tracking-tight text-foreground">
                      {status}
                    </span>
                  </>
                ) : null}
              </Link>
              <span className="text-sm text-foreground"> </span>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
