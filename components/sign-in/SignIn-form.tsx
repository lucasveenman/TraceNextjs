// components/sign-in/SignIn-form.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProvider = async () => {
    await signIn("github", {
      callbackUrl: "/",
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // credentials-auth coming soon
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-foreground/10 bg-background/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-6">
              {/* ------- GitHub button ------- */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleProvider}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.73 0 8.33c0 3.69 2.39 6.82 5.7 7.92.42.08.57-.19.57-.42 
                     0-.21-.01-.9-.01-1.64-2.32.52-2.81-1.02-2.81-1.02-.38-.99-.94-1.25-.94-1.25-.77-.54.06-.53.06-.53.85.06 
                     1.3.9 1.3.9.76 1.33 2 0.95 2.49.73.08-.57.3-.95.54-1.17C4.6 11 2.8 10.33 2.8 7.73c0-.96.33-1.76.88-2.37-.09-.22-.38-1.11.08-2.31 
                     0 0 .71-.23 2.33.9a7.7 7.7 0 0 1 2.12-.29c.72 0 1.45.1 2.13.29 
                     1.62-1.13 2.33-.9 2.33-.9.46 1.2.17 2.1.08 2.31.55.61.88 1.41.88 2.37 
                     0 2.61-1.8 3.27-3.52 3.44.31.28.58.82.58 1.66 0 1.2-.01 2.17-.01 2.47 
                     0 .23.15.5.58.42A8.34 8.34 0 0 0 16 8.33C16 3.73 12.42 0 8 0Z"
                  />
                </svg>
                Sign in with GitHub
              </Button>

              {/* ------- Divider ------- */}
              <div className="relative text-center text-sm before:absolute before:inset-y-0 before:left-0 before:my-auto before:h-px before:w-1/3 before:bg-border after:absolute after:inset-y-0 after:right-0 after:my-auto after:h-px after:w-1/3 after:bg-border">
                <span className="relative z-10 px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>

              {/* ------- Email/password (coming soon) ------- */}
              <div className="grid gap-6 opacity-70">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled
                  />
                </div>

                <Button type="submit" className="w-full" disabled>
                  Email sign-in coming soon
                </Button>
              </div>

              <div className="text-center text-sm">
                Want more info?{" "}
                <Link
                  href="/features"
                  className="underline underline-offset-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
