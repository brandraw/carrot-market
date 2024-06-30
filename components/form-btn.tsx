"use client";

import { useFormStatus } from "react-dom";

export function FormBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center w-full h-10 rounded-md text-white text-sm font-semibold bg-orange-400 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed hover:scale-95 transition"
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
