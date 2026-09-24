export interface Project {
  name: string
  /** owner/name on GitHub; omitted while a project is still closed. */
  repo?: string
  /** Canonical site, marketplace listing or add-on page. */
  href?: string
  what: string
  /** The closed thing it stands in for. Keep it concrete and honest. */
  replaces: string
  stack: string[]
  status?: string
  /** One line that gets it onto your machine. Only commands that work today. */
  install?: string
}

export interface Category {
  id: string
  title: string
  blurb: string
  projects: Project[]
}

export const categories: Category[] = [
  {
    id: 'read',
    title: 'Read, watch, listen',
    blurb: 'Media you keep on a disk you own, in a reader nobody ranks for you.',
    projects: [
      {
        name: 'Paperboy',
        repo: 'harbefas/paperboy',
        what: 'RSS reader and podcast player that takes over the browser new tab. Local-first, keyboard-first, published on Firefox Add-ons.',
        replaces: 'the algorithmic feed',
        stack: ['JavaScript', 'GPL-3.0'],
        install: 'addons.mozilla.org/firefox/addon/paperboy',
      },
      {
        name: 'paperboy-tui',
        repo: 'harbefas/paperboy-tui',
        what: 'The same reader in the terminal, with the podcast player attached.',
        replaces: 'a web app for reading text',
        stack: ['Rust', 'GPL-3.0'],
      },
      {
        name: 'Oikos',
        repo: 'harbefas/oikos',
        what: 'Self-hosted media and retro-gaming server. A d-pad dashboard on the TV, a phone hub that becomes a gamepad or a remote. Jellyfin and the *arr stack underneath.',
        replaces: 'a stack of streaming subscriptions',
        stack: ['Python', 'Svelte', 'AGPL-3.0'],
      },
    ],
  },
  {
    id: 'desktop',
    title: 'The desktop',
    blurb: 'Keyboard-driven tools for people who live in a tiling WM and a terminal.',
    projects: [
      {
        name: 'Amphora',
        what: 'A browser on CEF where dark mode, ad blocking and vim keys are part of the browser instead of four extensions asking to read every page.',
        replaces: 'Chrome plus a pile of extensions',
        stack: ['C++', 'JavaScript'],
        status: 'in development',
      },
      {
        name: 'Gambito',
        repo: 'harbefas/gambito',
        href: 'https://harbefas.github.io/gambito-site/',
        what: 'Keyboard-first Lichess client for tiling desktops: Rust daemon, Quickshell UI, Stockfish analysis, tournament broadcasts on the TV.',
        replaces: 'playing chess in a browser tab',
        stack: ['Rust', 'QML', 'GPL-3.0'],
      },
      {
        name: 'hyprpad',
        repo: 'harbefas/hyprpad',
        what: 'Turns a phone into a keyboard, trackpad and media remote for a Wayland desktop over the browser. Nothing to install on either side.',
        replaces: 'a proprietary remote-control app',
        stack: ['Python', 'JavaScript', 'GPL-3.0'],
        install: 'curl -fsSL https://raw.githubusercontent.com/harbefas/hyprpad/main/install.sh | bash',
      },
      {
        name: 'keybinds-tui',
        repo: 'harbefas/keybinds-tui',
        what: 'Looks up keybindings by parsing the eight real config sources, live Neovim included, so the reference cannot drift from the configs it documents.',
        replaces: 'a cheatsheet you forgot to update',
        stack: ['Rust', 'GPL-3.0'],
        install: 'cargo install keybinds-tui',
      },
    ],
  },
  {
    id: 'agents',
    title: 'Agent infrastructure',
    blurb: 'If an agent can touch production, the controls belong to you, not to the model vendor.',
    projects: [
      {
        name: 'Arbitus',
        repo: 'harbefas/arbitus',
        href: 'https://arbitus-gateway.xyz',
        what: 'Security gateway for MCP tool calls: per-agent auth, allow and deny lists, schema validation, payload filtering, human approval for risky calls, audit log. A prompt rule does not constrain a tool-using agent; the boundary does.',
        replaces: 'vendor-side guardrails you cannot inspect',
        stack: ['Rust', 'AGPL-3.0'],
        install: 'cargo install --locked --git https://github.com/harbefas/arbitus arbitus',
      },
      {
        name: 'Agent Code Buddy',
        repo: 'harbefas/agent-code-buddy',
        what: 'Approval surface on your phone. A pre-execution hook intercepts writes, shell commands and API calls, and returns allow, trust or deny in real time.',
        replaces: 'letting an agent run unattended',
        stack: ['Java', 'Python', 'Bash'],
      },
      {
        name: 'agent-memory',
        repo: 'nfvelten/agent-memory',
        what: 'MCP server for project memory across sessions: full-text search, staleness checks on stored facts, promotion of findings into durable notes.',
        replaces: 'context that dies with the session',
        stack: ['Python', 'MCP'],
      },
    ],
  },
  {
    id: 'design',
    title: 'Look and feel',
    blurb: 'One written spec, compiled into every editor and browser instead of pasted between them.',
    projects: [
      {
        name: 'Mate Creations',
        href: 'https://harbefas.github.io/matecreations-site/',
        what: 'Yerba Mate (dark) and Tererê (light): tokens authored in DTCG JSON, compiled with Style Dictionary, every pair checked against WCAG contrast in both themes.',
        replaces: 'a palette copy-pasted between tools',
        stack: ['TypeScript', 'CSS'],
      },
      {
        name: 'yerba-mate.nvim',
        repo: 'harbefas/yerba-mate.nvim',
        what: 'The colorscheme pair for Neovim, generated from the same tokens.',
        replaces: '—',
        stack: ['Lua', 'MIT'],
      },
      {
        name: 'Editor and browser ports',
        repo: 'harbefas',
        what: 'The same two themes for VS Code, Obsidian, Zen Browser and LibreWolf.',
        replaces: '—',
        stack: ['CSS', 'JSON'],
      },
    ],
  },
]
