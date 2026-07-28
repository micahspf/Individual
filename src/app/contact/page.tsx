"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    (e.target as HTMLFormElement).reset();
    toast("Message sent — we'll reply soon.");
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-4 text-muted-foreground">
          Questions about customization, shipping, or an order? Send a message and our team
          will get back within one business day.
        </p>
        <div className="mt-8 space-y-3 text-sm">
          <p>
            <span className="font-semibold">Email</span>
            <br />
            hello@individual.com
          </p>
          <p>
            <span className="font-semibold">Hours</span>
            <br />
            Mon–Fri, 9am–6pm ET
          </p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send message"}
        </Button>
      </form>
    </div>
  );
}
