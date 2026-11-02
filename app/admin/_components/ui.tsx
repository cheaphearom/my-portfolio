import type { ReactNode } from "react";

const inputClass =
  "mt-1 w-full rounded-md border border-ink/30 bg-white px-3 py-2 text-ink placeholder:text-slate/60";

export function Field({
  label,
  name,
  defaultValue = "",
  type = "text",
  required = false,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: "text" | "email" | "number" | "url";
  required?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint ? <span className="mt-1 block font-normal text-slate">{hint}</span> : null}
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue = "",
  rows = 4,
  hint,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className={inputClass}
      />
      {hint ? <span className="mt-1 block font-normal text-slate">{hint}</span> : null}
    </label>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select name={name} defaultValue={defaultValue} className={inputClass}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked = false,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="size-4"
      />
      {label}
    </label>
  );
}

export function SubmitButton({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "danger" | "quiet";
}) {
  const tones = {
    primary: "bg-ink text-cream",
    danger: "bg-red-700 text-white",
    quiet: "border border-ink/40 text-ink",
  };
  return (
    <button
      type="submit"
      className={`rounded-md px-4 py-2 text-sm font-semibold ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

export function Banner({
  saved,
  error,
}: {
  saved?: string | string[];
  error?: string | string[];
}) {
  const errorText = Array.isArray(error) ? error[0] : error;
  if (errorText) {
    return (
      <p role="alert" className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
        {errorText}
      </p>
    );
  }
  if (saved) {
    return (
      <p role="status" className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
        Saved. The public site updates within a few seconds.
      </p>
    );
  }
  return null;
}

export function PageTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description ? <p className="mt-2 max-w-[60ch] text-slate">{description}</p> : null}
    </div>
  );
}

export function NoDatabase() {
  return (
    <div className="rounded-md border border-ink/20 bg-white p-6">
      <h1 className="text-2xl font-bold">Database not connected</h1>
      <p className="mt-3 max-w-[60ch] text-slate">
        Set <code className="font-mono">DATABASE_URL</code> in{" "}
        <code className="font-mono">.env.local</code>, then run{" "}
        <code className="font-mono">npm run db:push</code> and{" "}
        <code className="font-mono">npm run db:seed</code>. See the README.
      </p>
    </div>
  );
}

/** A prominent "+ Add new" button that opens the create form. Place it above the list. */
export function AddNew({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="mb-8 overflow-hidden rounded-md border-2 border-ink bg-white"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 bg-ink px-4 py-3 font-semibold text-cream [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded bg-cream text-lg leading-none text-ink"
        >
          +
        </span>
        Add new {label}
      </summary>
      <div className="space-y-4 p-4">{children}</div>
    </details>
  );
}

/** One editable row: a collapsed summary that expands into the edit form. */
export function EditableItem({
  summary,
  children,
  deleteAction,
  id,
}: {
  summary: ReactNode;
  children: ReactNode;
  deleteAction: (formData: FormData) => void | Promise<void>;
  id: number;
}) {
  return (
    <details className="rounded-md border border-ink/20 bg-white">
      <summary className="cursor-pointer select-none px-4 py-3 font-medium">
        {summary}
      </summary>
      <div className="space-y-4 border-t border-ink/15 p-4">
        {children}

        <details className="text-sm">
          <summary className="cursor-pointer text-red-700">Delete…</summary>
          <form action={deleteAction} className="mt-3 flex items-center gap-3">
            <input type="hidden" name="id" value={id} />
            <span className="text-slate">This cannot be undone.</span>
            <SubmitButton tone="danger">Yes, delete</SubmitButton>
          </form>
        </details>
      </div>
    </details>
  );
}
