import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/authService.ts";

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
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="w-full max-w-md rounded-xl p-8 border border-white/10"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Cyan Danışmanlık"
            className="h-20 w-auto mx-auto mb-4"
          />
          <h1 className="text-xl font-bold text-white">Admin Girişi</h1>
          <p className="text-gray-400 text-sm mt-1">
            Devam etmek için giriş yapın
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              required
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
              style={{ backgroundColor: "#1a1a1a" }}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
              style={{ backgroundColor: "#1a1a1a" }}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-3 rounded-lg transition text-black disabled:opacity-50"
            style={{ backgroundColor: "#06b6d4" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0891b2")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#06b6d4")
            }
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </main>
  );
}