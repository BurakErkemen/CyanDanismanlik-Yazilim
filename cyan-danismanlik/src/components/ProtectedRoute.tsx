import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthChange } from "../lib/authService";
import { type User } from "firebase/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    );
  }

  if (user === null) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}