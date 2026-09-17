# MCP servers

Project MCP servers live in `.mcp.json` at the repo root. Claude Code loads it
automatically for anyone working in this repo (it prompts once to approve).

## context (Era Context)

| Field | Value |
|---|---|
| Transport | HTTP |
| URL | `https://context.era.app` |
| Auth | `Authorization: Bearer ${ERA_CONTEXT_API_KEY}` |

### Setup

1. Get an API key from Era Context.
2. Put it in `.env.local` (git-ignored), or export it in your shell:

   ```bash
   export ERA_CONTEXT_API_KEY="your-key"
   ```

3. Start Claude Code from the repo root and approve the server when asked.
4. Verify with `/mcp` — `context` should show as connected.

### Rules

- `.mcp.json` is committed; the key is **not**. `${ERA_CONTEXT_API_KEY}` is
  expanded from the environment at launch, so no secret ever lands in git.
- If the server shows as failed, the key is missing or expired — re-export and
  restart Claude Code.
