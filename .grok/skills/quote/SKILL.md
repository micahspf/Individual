---
name: quote
description: Price a custom manufacturing job for Individual and draft the customer email. Use when the user describes a job, asks what to charge, or says /quote.
argument-hint: "[describe the job — size, material, quantity, deadline]"
---

# Quote a job

## Formula — never deviate
$25 base
+ $0.15 per gram of material
+ $6 per machine-hour (print + laser combined)
+ $15 setup and $2 per laser-minute if engraving
+ blank cost x 3
+ design fee: $0 simple / $35 modify / $95 from scratch
+ 40% if delivery is under 5 days
Round UP to the nearest $5. Never quote below $25.

## Output
1. **The math** — every line with its number, then the total.
   Show estimated material cost and margin. Flag if margin is under 60%.
2. **The email** — confirm what they asked for in their own words,
   line items (materials / machine time / design / rush / shipping),
   then TWO options:
   - A: exactly what they asked for
   - B: a simplified version, one specific thing changed, lower price
   Lead time as a specific date. Quote valid 14 days.
   Close with: "Reply with A or B and I'll send a payment link."

## Rules
- Two options always. It turns yes/no into which.
- Never discount. Smaller scope, not lower price.
- If anything needed for the estimate is missing, ask for it instead of guessing.
- Decline: licensed characters, quantities over 25, deadlines under 72 hours.
