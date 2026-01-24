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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OtpInput from "react-otp-input";
import {
  useSignupUserMutation,
  useVerifyOtpMutation,
} from "@/redux/api/authApi";
import { TSignUp } from "@/types/signup";
import { toast } from "sonner";
// types

export default function SignupFormClient() {
  const [open, setOpen] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const [signupUser, { isLoading, data }] = useSignupUserMutation();
  const [verifyOtp, { isLoading: otpLoading }] = useVerifyOtpMutation();
  const router = useRouter();

  const [credential, setCredential] = useState<TSignUp>({
    name: "",
    email: "",
    password: "",
    isAgreeWithTerms: false,
  });
  //   form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credential);
    try {
      const res = await signupUser(credential).unwrap();
      console.log(res);
      if (res.success) {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Submit OTP
  const handleSubmitOtp = async () => {
    const otpRes = await verifyOtp({ email: data?.data?.email, otp: otp });
    console.log(otpRes);
    if (otpRes?.data?.success) {
      toast.success("Signup successful");

      router.push("/login");
    }
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
            {isLoading ? "Signing..." : "Sign Up"}
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
      {/* otp dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="hidden">
          <Button>Add Dose</Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          showCloseButton={false}
          className="max-h-[90vh] max-w-sm w-sm overflow-y-auto [data-slot=dialog-close]:hidden"
        >
          <DialogTitle className="text-xl text-center font-semibold text-gray-800">
            Verification Code
          </DialogTitle>
          <p className="text-center text-primary/70 -mt-2">
            Enter the verification code that we have sent to your email
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={
              "w-[80%] mx-auto flex item-center justify-between gap-1"
            }
            inputStyle={"border flex-1 h-10 w-10 rounded-lg"}
          />
          <Button
            onClick={handleSubmitOtp}
            disabled={otp.length === 4 ? false : true}
          >
            {otpLoading ? "Verifying" : "Verify"}
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
