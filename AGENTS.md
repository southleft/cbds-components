# AGENTS.md

## Storybook MCP

This repo runs the Storybook MCP server (`storybook-mcp`) at `http://localhost:6006/mcp` whenever Storybook is running (`npm run storybook`).

When working on UI components, always use the `storybook-mcp` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **Never guess component props.** Call `docs-list` to see what exists, then `docs-show` for a component's documented props and example stories. Use only props that are documented or shown in an example story. If something isn't documented, ask the user.
- **Before writing or editing stories**, call `get-storybook-story-instructions` to get the current story-writing guidance.
- **After changing anything visual** (components, stories, CSS, tokens), call `stories-preview` and include the preview URLs in your response.
- If the MCP server is unreachable, Storybook probably isn't running. Ask the user to start it rather than working from memory.
