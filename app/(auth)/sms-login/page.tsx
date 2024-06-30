"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleSms } from "./actions";

const initialState = {
  token: false,
  errors: undefined,
};

export default function SmsLogin() {
  const [state, action] = useFormState(handleSms, initialState);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">SMS Login</h1>
      <form action={action} className="space-y-3">
        {!state.token && (
          <FormInput
            label="Phone Number"
            name="phone"
            type="text"
            required
            placeholder="010-0000-0000"
            errors={state.errors?.formErrors}
          />
        )}
        {!!state.token && (
          <FormInput
            label="Sms Token"
            name="token"
            type="number"
            required
            placeholder="000000"
            errors={state.errors?.formErrors}
          />
        )}
        <FormBtn label={!state.token ? "Send a Token" : "Verification"} />
      </form>
    </div>
  );
}
