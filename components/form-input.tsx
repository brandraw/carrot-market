"use client";

import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  name: string;
  label?: string;
  errors?: string[];
}

export function FormInput({
  name,
  label,
  errors = [],
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        disabled={pending}
        {...rest}
        className="border rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed placeholder:text-sm"
      />
      {errors.map((a, i) => (
        <div key={i} className="text-xs text-red-500">
          {a}
        </div>
      ))}
    </div>
  );
}
