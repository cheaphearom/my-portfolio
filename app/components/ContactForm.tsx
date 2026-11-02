"use client";

import { useActionState } from "react";
import { sendMessage } from "../actions/contact";

const inputClass =
  "mt-1 w-full rounded-xl border border-cream/35 bg-white/10 px-3 py-2.5 text-cream placeholder:text-cream/50";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, undefined);

  if (state?.ok) {
    return (
      <p role="status" className="rounded-2xl border border-cream/40 p-5 text-lg">
        Thanks, your message was sent. I’ll get back to you soon.
      </p>
    );
  }

  const errors = state?.fieldErrors;

  return (
    <form action={action} className="space-y-5" noValidate>
      <label className="block text-sm font-medium">
        Name
        <input name="name" autoComplete="name" required className={inputClass} />
        {errors?.name ? <span className="mt-1 block text-sm text-red-300">{errors.name}</span> : null}
      </label>

      <label className="block text-sm font-medium">
        Email
        <input name="email" type="email" autoComplete="email" required className={inputClass} />
        {errors?.email ? <span className="mt-1 block text-sm text-red-300">{errors.email}</span> : null}
      </label>

      <label className="block text-sm font-medium">
        Message
        <textarea name="message" rows={5} required className={inputClass} />
        {errors?.message ? <span className="mt-1 block text-sm text-red-300">{errors.message}</span> : null}
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-300">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-cream px-6 py-3 font-semibold text-ink disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
