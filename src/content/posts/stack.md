---
title: This stack
description: "How this site is built."
pubDate: 2023-11-04
---

**Update (Oct 15 2025):** This site is now running on Cloudflare instead of Vercel.

I'm always curious about the tech stack for products I use daily. Sometimes the most wonderful user experiences are backed by the wildest tech choices (but, like I've said before, an ugly backend that ships is better than perfect backend that nobody sees).

For my personal site (this site), I've changed stacks several times over the years. It started retro with static HTML, then I migrated it to Ruby using Jekyll, then to Javascript with Gatsby, then to TypeScript with Next.js. But once I discovered Astro, I knew it'd be the perfect match for me.

### Tech used:

- [Astro](https://astro.build) using Typescript, hosted on [Cloudflare](https://cloudflare.com). You can't beat Astro for content sites. It has it all built-in, and bundles everything into a tiny package.
- [Tailwind CSS](https://tailwindcss.com) for styling. Nothing compares.

The stack couldn't be simpler, thanks to Astro.

---

**Previous stack, circa 2023->2024:**

- [Next.js](https://nextjs.org) using Typescript, hosted on [Vercel](https://vercel.com). I don't care that Vercel is "expensive", it's a dream to work with. And Next for building static content, like it was originally intended. The dream.
- [StartKit](https://startkit.dev) for the Next.js boilerplate, running on CloudFlare. I wrote it, so I'm biased. But it got me running quickly and lets me git pull the latest and greatest with no headaches.
- [Tailwind CSS](https://tailwindcss.com) for styling. I have too much love for Tailwind.
- [Contentlayer](https://contentlayer.dev) for markdown content. I previously used [MDX](https://mdxjs.com) directly but Contentlayer was just too easy to use.

I once wrote that "we've gone too far" with all the tech needed to host a static site like this. I still believe that to an extend, but I love to write in
[markdown](https://daringfireball.net/projects/markdown/), and I love how this site is built.

So I may be a hypocrite, but I'm a happy hypocrite.
