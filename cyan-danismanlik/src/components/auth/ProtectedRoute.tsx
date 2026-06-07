import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { onAuthChange, isAdmin } from "@/lib/authService";
import { type User } from "firebase/auth";
import { PageLoader } from "@/components/ui";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        const adminStatus = await isAdmin();
        setAdmin(adminStatus);
      } else {
        setAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined || admin === null) {
    return <PageLoader />;
  }

  if (!user || !admin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}