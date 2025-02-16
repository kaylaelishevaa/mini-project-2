"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthCheck() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/me", {
          credentials: "include",
        });
        // Jika response 401 atau 403 => user belum login
        if (!res.ok) {
          router.replace("/login");
          return;
        }
        // Jika OK => user login
      } catch (error) {
        if (error instanceof Error) {
          router.replace("/login");
        }
        // Kalau error apa pun, redirect ke login
      } finally {
        setLoading(false);
      }
    }
    verifyAuth();
  }, [router]);

  return { loading };
}
