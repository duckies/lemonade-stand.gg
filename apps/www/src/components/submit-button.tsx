"use client";

import { Button, type ButtonProps } from "@lemonade-stand/ui";
import { useFormStatus } from "react-dom";

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return <Button type="submit" disabled={pending} {...props} />;
}
