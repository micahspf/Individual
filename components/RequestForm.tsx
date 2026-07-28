"use client";

import { useState } from "react";

export default function RequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [response, setResponse] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setResponse("");

    try {
      const res = await fetch("/api/agents/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setResponse(data.reply || "Request received. We’ll be in touch soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setResponse(err instanceof Error ? err.message : "Failed to send request");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              Name <span className="normal-case tracking-normal text-[var(--fg-soft)]">(optional)</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Micah"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
            What would you like made? *
          </label>
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="input-field min-h-[140px] resize-y"
            placeholder="Example: Custom name plate, 8 inches wide, black acrylic, name Parker in a clean modern font."
          />
          <p className="mt-2 text-xs text-[var(--fg-soft)]">
            Include size, material, color, and quantity if you know them.
          </p>
        </div>

        <button type="submit" disabled={status === "loading"} className="btn-primary">
          {status === "loading" ? "Sending request…" : "Request a quote"}
        </button>
      </form>

      {status === "success" && (
        <div
          className="mt-6 rounded-2xl border border-[color-mix(in_oklab,var(--success)_35%,transparent)] bg-[color-mix(in_oklab,var(--success)_12%,transparent)] p-4 text-sm leading-relaxed text-[var(--fg)] whitespace-pre-wrap"
          role="status"
        >
          {response}
        </div>
      )}

      {status === "error" && (
        <div
          className="mt-6 rounded-2xl border border-[color-mix(in_oklab,var(--danger)_40%,transparent)] bg-[color-mix(in_oklab,var(--danger)_12%,transparent)] p-4 text-sm text-[var(--fg)]"
          role="alert"
        >
          {response}
        </div>
      )}
    </div>
  );
}
