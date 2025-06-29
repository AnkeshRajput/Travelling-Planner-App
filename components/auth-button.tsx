"use client";

import { useRouter } from "next/navigation";
import { login } from "@/lib/auth-actions";

interface AuthButtonProps {
  isLoggedIn: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function AuthButton({
  isLoggedIn,
  className,
  children,
}: AuthButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (isLoggedIn) {
      router.push("/trip");
    } else {
      await login();
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}