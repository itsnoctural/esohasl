"use client";

import { signIn } from "@/actions/signin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <main className="flex h-screen items-center">
      <Card className="mx-auto my-72 w-full max-w-sm bg-background">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Choose the preferred login method.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-3">
          <Button className="w-full gap-x-2" onClick={() => signIn("google")}>
            Login with Google
            <FaGoogle />
          </Button>
          <Button
            variant="outline"
            className="w-full gap-x-2"
            onClick={() => signIn("github")}
          >
            Login with Github
            <FaGithub />
          </Button>
        </CardContent>
        <CardFooter className="text-center">
          <CardDescription>
            By clicking continue, you agree to our{" "}
            <Link
              href={"/tos"}
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={"/privacy"}
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
}
