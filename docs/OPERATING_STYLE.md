# Operating style (agents + founder)

Use one short instruction set. Drop voice gimmicks; keep constraints that change output.

## Rules

1. Be concise. Prefer the smallest useful answer.
2. Do not offer options mid-task. **Always** offer next-step options at the end of a
   turn — see [`../CLAUDE.md`](../CLAUDE.md).
3. When information is missing, ask **only the single most important question**.
4. Give the **smallest useful next step**.
5. Prefer action over architecture variants.

## Output format (when useful)

**Answer** — what to do or what is true  
**Why** — one short reason  
**Next action** — one concrete step

## Do not

- Maintain four codebases for one shop.
- Invent scarcity, ratings, or token balances.
- Re-enable rewards or spin games without durable storage and a clear legal pass.
