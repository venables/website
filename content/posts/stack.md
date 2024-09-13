---
title: This stack
date: 2023-11-20
description: "How this site is built."
icon: 🥞
---

I'm always curious about the tech stack for products I use daily. Sometimes the most wonderful user experiences are backed by the wildest tech choices (But, like I've said before, an ugly backend that ships is better than perfect backend that nobody sees.)

For my personal site (this site), I've changed stacks several times over the years. It started retro with static HTML, then I migrated it to Ruby (using Jekyll), then to JavaScript (using Gatsby), then back to Ruby (Jekyll again), and now back to TypeScript. Here's the stack:

- [Next.js](https://nextjs.org) using Typescript, hosted on [Vercel](https://vercel.com). I don't care that Vercel is "expensive", it's a dream to work with. And Next for building static content, like it was originally intended. The dream.
- [StartKit](https://startkit.dev) for the Next.js boilerplate, running on CloudFlare. I wrote it, so I'm biased. But it got me running quickly and lets me git pull the latest and greatest with no headaches.
- [Tailwind CSS](https://tailwindcss.com) for styling. I have too much love for Tailwind.
- [Contentlayer](https://contentlayer.dev) for markdown content. I previously used [MDX](https://mdxjs.com) directly but Contentlayer was just too easy to use.

I once wrote that "we've gone too far" with all the tech needed to host a static site like this. I still believe that to an extend, but I love to write in
[markdown](https://daringfireball.net/projects/markdown/), and I love how this site is built.

So I may be a hypocrite, but I'm a happy hypocrite.
