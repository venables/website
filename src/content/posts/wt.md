---
title: "wt: A Git Worktree Helper"
description:
  "A simple script for managing git worktrees, built for running multiple coding
  agents in parallel."
pubDate: 2025-01-21
---

Git worktrees are having a moment. With tools like Claude Code, opencode, and
amp, you can run multiple coding agents in parallel—but they step on each
other's toes when they run in the same directory, and I'm looking for maximum
efficiency here. Worktrees are a clean way to give each agent its own space.

I've been using worktrees more than ever, and the native git commands are
verbose enough that I tossed together a helper script called
[`wt`](https://github.com/venables/wt).

## What it does

```sh
# Create a worktree for an existing branch
wt feature/login

# Worktree ends up at ../myproject-feature/login
```

It handles the path for you. Worktrees live at `../<repo>-<branch>`, which keeps
them organized and out of the way. With a small shell setup, it'll auto-cd you
into the new worktree too.

A few other commands:

```sh
# List worktrees
wt ls

# Clean up
wt rm feature/login
```

## .worktreeinclude

The other thing `wt` does is copy over gitignored files—your `.env`,
`.env.local`, etc.—so the new worktree actually works.

Create a `.worktreeinclude` file to specify what gets copied:

```
.env
.env.local
```

This is the same format that Claude Desktop and Cline support. If the file
doesn't exist, `wt` falls back to copying everything in `.gitignore` that exists
in the source worktree. If you don't want any files copied, use `--no-copy`.

## Bonus: Even more speed

Add a `wtc` function to your `.zshrc` or `.bashrc` that creates a worktree and
launches Claude Code in one go:

```sh
wtc() { wt "$@" && claude; }
```

## Install

```sh
brew install venables/tap/wt
```

[Check out the repo on GitHub.](https://github.com/venables/wt)
