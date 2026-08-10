"use client";

import { AuthView } from "@/components/AuthView";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (email: string) => {
    // In a real application, you would set a cookie or context here.
    // For this mock, we just navigate to the dashboard where state assumes authenticated.
    router.push("/dashboard");
  };

  return <AuthView onLoginSuccess={handleLoginSuccess} />;
}
