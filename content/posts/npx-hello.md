---
title: npx hello
date: 2023-11-20
description: "Introducing 'npx hello', the easiest way to browse GitHub profiles from the command line."
icon: 👋
---

If you're anything like me, you spend your entire day in and out of the terminal. And, often you want to learn more about the developers behind some of your favorite code. But that requires the immense effort of opening up a browser and going to GitHub and looking through their profile.

Suffer no more, my friend. Because today, I put together a tiny, fun npm package called [`hello`](https://www.npmjs.com/package/hello) which lets you browse Github profiles directly from the command line. Now you have one less reason to leave the terminal.

The package is intentionally limited and simple. Just type: `npx hello` followed by a Github username and it will print out a summary of the user's profile, including their name, bio, location, and links to their website, Twitter, and Github.

For example, my profile:

```sh
npx hello venables
```

![npx hello venables](/images/posts/npx-hello.png)

## But ... why?

That's a great question. I had reserved the `hello` name quite some time ago, and hand never found a good use-case for it. At first, it was
going to be a websocket-based web framework (think: a node.js version of rails that runs entirely via sockets), but the world has plenty of frameworks. Then I thought it would be a good name for a package that will just print "Hello, world!" in a random language. But that's not very useful outside of maybe a demo or two.

So the name laid dormant.

Until today.

While browsing Github profiles for candidates at [Catena Labs](https://catena.xyz) (psst: **We're hiring!**), the thought
occurred to me: **wouldn't it be great if everyone had a consistent CV?** And even better, it should be accessible via the command line! So, I tossed together v0 of this project.

Check out the [source code](https://github.com/hello-js/hello) if you're interested. It's a simple Typescript project built from the [`startkit typescript`](https://github.com/startkit-dev/typescript) starter template.
