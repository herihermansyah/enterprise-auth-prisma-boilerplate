"use client";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import z from "zod";
import {registerSchema} from "../../features/user/schemas/user-schema";
import {useState} from "react";
import {registerAction} from "../../features/user/actions/register.action";

type FormError = z.inferFlattenedErrors<typeof registerSchema>["fieldErrors"];

export function SignupForm({...props}: React.ComponentProps<typeof Card>) {
  const [error, setError] = useState<FormError | undefined>(undefined);

  async function handleRegister(formData: FormData) {
    try {
      const result = await registerAction(formData);
      if (result.messages) {
        setError(result.messages);
      }
    } catch {}
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleRegister}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            {error?.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input name="password" id="password" type="password" required />
              {error?.password && (
                <p className="text-sm text-red-500">{error.password}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                name="confirmPassword"
                id="confirm-password"
                type="password"
                required
              />
              {error?.confirmPassword && (
                <p className="text-sm text-red-500">{error.confirmPassword}</p>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
