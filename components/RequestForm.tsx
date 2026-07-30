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
      if (!res.ok) throw new Error(data.error || "Something went wrong");

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
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-300">
            Your name <span className="text-neutral-600">(optional)</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30"
            placeholder="Micah"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-300">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-300">
            What would you like made? *
          </label>
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full resize-y rounded-xl border border-neutral-800 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30"
            placeholder="Example: Custom name plate, 8 inches wide, black, name Parker in a clean modern font."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-pink-500 py-3 px-6 font-medium text-white transition hover:bg-pink-400 disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send request"}
        </button>
      </form>

      {status === "success" && (
        <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm whitespace-pre-wrap text-emerald-200">
          {response}
        </div>
      )}
      {status === "error" && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {response}
        </div>
      )}
    </div>
  );
}
