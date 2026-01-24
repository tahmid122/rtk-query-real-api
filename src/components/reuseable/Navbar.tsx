"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout, useCurrentUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-primary/90">
          MedTrack
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="relative text-base font-medium text-gray-700 transition hover:text-primary/90"
          >
            Home
          </Link>

          <Link
            href="/doses"
            className="relative text-base font-medium text-gray-700 transition hover:text-primary/90"
          >
            Doses
          </Link>

          {/* Auth */}
          {user ? (
            <Button
              onClick={() => {
                dispatch(logout());
                router.push("/login");
              }}
              className="bg-red-700 hover:bg-red-800"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
