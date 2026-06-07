import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/authService";
import { Card, Input, Button } from "@/components/ui";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError("E-posta veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/20 opacity-40 blur-3xl" />
      <Card className="relative w-full max-w-md p-8 glow-brand">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Cyan Danışmanlık" className="mx-auto mb-4 h-20 w-auto" />
          <h1 className="text-xl font-bold text-white">Admin Girişi</h1>
          <p className="mt-1 text-sm text-gray-400">Devam etmek için giriş yapın</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="E-posta"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
            required
          />
          <Input
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
