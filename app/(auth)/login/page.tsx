"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { handleLogin } from "./actions";

export default function Login() {
  const [state, action] = useFormState(handleLogin, null);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <form action={action} className="space-y-4">
        <FormInput
          label="E-amil"
          name="email"
          type="email"
          required
          placeholder="username@domain.com"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          placeholder="********"
          errors={state?.fieldErrors.password}
        />
        <FormBtn label="Log In" />
      </form>

      <div className="flex gap-2 *:text-sm">
        <span className="text-neutral-500">You don't have an account?</span>
        <Link href="/signup" className="text-orange-400 hover:underline">
          Go Sign Up!
        </Link>
      </div>
      <Link
        href="/github/start"
        className="h-10 flex items-center justify-center rounded-md bg-neutral-400 text-neutral-200 w-full"
      >
        Github Login
      </Link>
    </div>
  );
}
