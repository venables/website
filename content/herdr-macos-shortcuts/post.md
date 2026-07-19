---
title: Give Herdr macOS keyboard shortcuts with Ghostty
description:
  "Remap Herdr's keybindings to native macOS chords in Ghostty so you don't need
  a cheat sheet."
pubDate: 2026-07-17
---

I got tired of keeping a cheat sheet open for [Herdr](https://herdr.dev)'s
keyboard shortcuts, so I made them match the macOS native shortcuts: `cmd+t` for
a new tab, `cmd+w` to close, `cmd+d` to split, `cmd+1..9` to jump workspaces.

It's just two changes. First, in your Ghostty config, map the native chords to
the sequences Herdr listens for (`\x02` is Herdr's `ctrl+b` prefix):

```
# ~/.config/ghostty/config

# macos/chrome-style herdr actions
keybind = cmd+KeyT=text:\x02t
keybind = cmd+t=unbind
keybind = cmd+KeyN=text:\x02n
keybind = cmd+n=unbind
# cmd+w closes the focused pane; cmd+shift+w force-closes the whole tab
keybind = cmd+KeyW=text:\x02x
keybind = cmd+w=unbind
keybind = cmd+shift+KeyW=text:\x02W
keybind = cmd+shift+w=unbind

# rename: cmd+r -> tab, cmd+shift+r -> workspace
keybind = cmd+KeyR=text:\x02T
keybind = cmd+r=unbind
keybind = cmd+shift+KeyR=text:\x02N
keybind = cmd+shift+r=unbind

# splits: cmd+d vertical, cmd+shift+d horizontal
keybind = cmd+KeyD=text:\x02v
keybind = cmd+d=unbind
keybind = cmd+shift+KeyD=text:\x02-
keybind = cmd+shift+d=unbind

# zoom active pane
keybind = cmd+shift+enter=text:\x02z

# pane navigation: cmd+opt+hjkl
keybind = cmd+alt+KeyH=text:\x02h
keybind = cmd+alt+KeyJ=text:\x02j
keybind = cmd+alt+KeyK=text:\x02k
keybind = cmd+alt+KeyL=text:\x02l

# pane cycling: cmd+[ prev, cmd+] next
keybind = cmd+left_bracket=text:\x02i
keybind = cmd+right_bracket=text:\x02u

# cmd+1..9 -> herdr workspaces
keybind = cmd+1=text:\x1b[49;6u
keybind = cmd+2=text:\x1b[50;6u
keybind = cmd+3=text:\x1b[51;6u
# ...through cmd+9
```

Then, in your Herdr config, remap a few keys to match the chords above:

```toml
# ~/.config/herdr/config.toml

[keys]
prefix = "ctrl+b"

new_tab = "prefix+t"
new_workspace = "prefix+n"
close_tab = "prefix+shift+w"
rename_workspace = "prefix+shift+n"
cycle_pane_previous = "prefix+i"
cycle_pane_next = "prefix+u"
```

Gist here: https://gist.github.com/venables/1b634058f9f4eafe1327d73930a3d3cd
