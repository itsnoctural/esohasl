"use client";

import { signIn } from "@/actions/signin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <Card className="mx-auto my-72 w-full max-w-sm bg-background">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-y-2">
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
    </Card>
  );
}
