"use client";

import { useState, type FormEvent } from "react";
import { WAITLIST_COPY } from "@/lib/content";

const inputClasses =
  "w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-slate-light focus:border-blue focus:ring-2 focus:ring-blue/30 focus:outline-none";

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>(WAITLIST_COPY.roles[0]);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setJoined(true);
  };

  if (joined) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-blue/30 bg-blue/[0.04] p-8 text-center"
      >
        <h2 className="font-display text-2xl font-bold text-ink">
          {WAITLIST_COPY.successHeading}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate">
          {WAITLIST_COPY.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-ink/10 bg-paper p-8 shadow-card"
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="waitlist-name"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            {WAITLIST_COPY.nameLabel}
          </label>
          <input
            id="waitlist-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={WAITLIST_COPY.namePlaceholder}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="waitlist-email"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            {WAITLIST_COPY.emailLabel}
          </label>
          <input
            id="waitlist-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={WAITLIST_COPY.emailPlaceholder}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="waitlist-role"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            {WAITLIST_COPY.roleLabel}
          </label>
          <select
            id="waitlist-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClasses}
          >
            {WAITLIST_COPY.roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-signal">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-dark hover:shadow-lg hover:shadow-blue/25"
        >
          {WAITLIST_COPY.submitLabel}
        </button>
      </div>
    </form>
  );
}
