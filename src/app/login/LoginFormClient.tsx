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
import { useLoginUserMutation } from "@/redux/api/loginApi";
import {} from "@/redux/api/userApi";
import { setUser } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginFormClient() {
  const router = useRouter();

  const [loginUser, { isLoading, isError, data }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    fcmToken: "sdafs",
    timeZone: "GMT+05:30",
  });
  //   form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser(credential).unwrap();
      dispatch(
        setUser({
          user: res.data.user,
          token: res.data.tokens.accessToken,
        }),
      );
      router.push("/doses");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
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
          </div>
          <Button type="submit" className="w-full mt-5" disabled={isLoading}>
            {isLoading ? "Logging.." : "Login"}
          </Button>
        </form>
        {isError && (
          <p className="text-center mt-3 font-semibold text-red-500">
            {isError}
          </p>
        )}
        <Link
          href="/signup"
          className="text-center w-full block mt-3 text-sm font-semibold underline"
        >
          Sign Up
        </Link>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
