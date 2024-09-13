---
title: Type-safe API routes in Next.js
date: 2024-01-09
description: "Introducing 'typed-route-handler', the easiest way to add type-safety to Next.js Route Handlers"
icon: 💪
---

Since the release of Next.js 14, I have been converting all of my existing (and new) products to use the app directory and Server Components. The journey has been exciting, albeit with it's fair share of bumps in the road. But one of the features I've most enjoyed was the creation of **Route Handlers**. Built on web standards, these incredibly powerful handlers allow us to return _anything_ from a specific route -- a JSON API response, an image, a stream, React Components... _anything_!

While these route handlers offer incredible flexibility, it also means they don't offer many guard-rails. In fact, these handlers are extremely minimal by default. And that's where they can bite you. Because you can return anything from these handlers, there's no contract that you're actually responding with the right thing, or even responding at all. And if you are responding with something, is it what you promised?

## The missing API features for Next.js

Enter `typed-route-handler`, a new node module I built for Next.js Route Handlers. It's a lightweight module that packs some serious Developer Experience (DX) and productivity punch. With a couple of lines, you can have a fully type-safe API endpoint, automatic validation handling, with request logging and timing.

Here's a minimal example of how it works:

```ts
import { handler } from "typed-route-handler"

type ResponseData = {
  result: string
  over: number
}

export const GET = handler<ResponseData>((req) => {
  // This response much match ResponseData
  return NextResponse.json({
    result: "this response is type-checked",
    over: 9000
  })
})
```

Or, a more complete example with URL parameter types:

```ts
import { handler } from "typed-route-handler"
import { auth } from "@/auth"

type ResponseData = {
  result: string
  over: number
}

type Context = {
  params: {
    id: string
  }
}

/**
 * GET /api/articles/:id
 */
export const GET = handler<ResponseData, Context>(async (req, context) => {
  // If the user is not authenticated, we can call `unauthorized()` which will
  // automatically be caught by the handler, and respond with an HTTP 401.
  const session = await auth()
  if (!session) {
    unauthorized()
  }

  // `context` is type-safe here
  const article = findArticle(context.params.id)

  // This response much match ResponseData
  return NextResponse.json({
    result: "this response is type-checked",
    over: 9000
  })
})
```

## Going further with zod

I'm a big user of `zod` for schema validation, and wanted to bring some of that power to `typed-route-handler`.

First and foremost, if you use zod within a handler, any validation errors will automatically get caught and returned to the client as such. This works even if you don't specify any return types. For example:

```ts
import { z } from "zod"

const bodySchema = z.object({
  name: z.string().min(3),
  age: z.number()
})

/**
 * POST /api/settings
 */
export const POST = handler(async (req) => {
  // Any parsing error here will throw a Validation Error
  const { name, age } = bodySchema.parse(await req.json())

  return NextResponse.json({
    ok: true
  })
})
```

You can use zod with route parameters, search params, and basically everything else; it all will be properly handled by `typed-route-handler`.

## Making your APIs better

Developing this, I realized this was **the missing API endpoint layer for Next.js**. By simply wrapping my existing API routes with `handler`, I got a slew of basic features that I would expect Next.js to ship with. Namely:

- **Response type-checking:** Make sure your API endpoints are honoring their side of the contract.
- **Request Parameter type-checking:** Your route can be defined with a `zod` schema, allowing you to validate and coerce URL parameters. You can validate a token is a uuid/cuid, or even coerce an ID to a number.
- **Deep `zod` compatibility:** When you call a zod schema's `parse` method within a handler, any exceptions are caught and returned as a `400 Validation Error`
- **Helpful error methods:** Following Next's `notFound()` standard, we exposed `unauthorized()` (HTTP 401) and `validationError()` (HTTP 400) methods, which are of type `never` so they can be used anywhere in the handler.
- And, at a more basic level, I get request logging and timing.

## Give it a try

```sh
npm i typed-route-handler

# or better yet:
bun add typed-route-handler
```

[Check out the README for more examples](https://github.com/venables/typed-route-handler), and let me know what you think.

The code is MIT-licensed and free to use. As always, pull requests and improvements are welcome!
