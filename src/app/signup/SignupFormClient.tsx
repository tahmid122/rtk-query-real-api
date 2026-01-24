"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {} from "@/redux/api/userApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignupFormClient() {
  const router = useRouter();

  const [credential, setCredential] = useState<{
    name: string;
    email: string;
    password: string;
    isAgreeWithTerms: boolean;
  }>({
    name: "",
    email: "",
    password: "",
    isAgreeWithTerms: false,
  });
  //   form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(credential);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Signup a new account</CardTitle>
        <CardDescription>
          Enter information for creating a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                onChange={(e) =>
                  setCredential((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) =>
                  setCredential((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) =>
                  setCredential((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-primary">
                Agree with our policy?
              </p>
              <Input
                id="isAgreeWithTerms"
                className="w-4"
                type="checkbox"
                onChange={(e) =>
                  setCredential((prev) => {
                    return {
                      ...prev,
                      isAgreeWithTerms: !!e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-5">
            Signup
          </Button>
        </form>

        <Link
          href="/login"
          className="text-center w-full block mt-3 text-sm font-semibold underline"
        >
          Login
        </Link>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
