"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleSignup } from "./actions";

export default function SignUp() {
  const [state, action] = useFormState(handleSignup, null);

  return (
    <div className="space-y-4">
      <h1>This is SignUp Page!</h1>
      <form action={action} className="space-y-3">
        <FormInput
          label="Username"
          name="username"
          type="text"
          required
          placeholder="Enter Your Name"
          errors={state?.fieldErrors.username}
        />
        <FormInput
          label="E-mail"
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
        <FormInput
          label="Password Confirm"
          name="password_confirm"
          type="password"
          required
          placeholder="********"
          errors={state?.fieldErrors.password_confirm}
        />
        <FormBtn label="Sing Up!" />
      </form>
    </div>
  );
}
