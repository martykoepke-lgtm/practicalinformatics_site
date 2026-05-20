"use client";

import { useState } from "react";
import { mailto } from "@/lib/links";

/**
 * Interim contact form: no backend, no secrets. On submit it opens the
 * visitor's mail client with a prefilled message to Marty. When a form
 * backend (Formspree / Resend) is chosen, swap the submit handler for a
 * fetch — the markup stays the same.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}\n`;
    window.location.href = mailto(
      `Inquiry from ${name || "the website"}`,
      body,
    );
  }

  const field =
    "mt-2 w-full rounded-md border border-tan bg-cream px-4 py-3 text-charcoal outline-none transition-colors focus:border-forest";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-forest">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-forest">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-forest">
          What brings you here today?
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={field}
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-forest px-7 py-3.5 font-medium text-cream transition-colors hover:bg-forest-dark"
      >
        Send
      </button>
    </form>
  );
}
