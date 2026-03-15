import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange, logout } from "../lib/authService";
import { type User } from "firebase/auth";
import BlogManager from "../components/BlogManager";
import TeamManager from "../components/TeamManager";
import MessagesManager from "../components/MessagesManager";
import PopupManager from "../components/PopupManager";
import SiteSettingsManager from "../components/SiteSettingsManager";
import AccountingManager from "../components/AccountingDashboard";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"blog" | "team" | "messages" | "popup" | "settings" | "accounting">("accounting");

  useEffect(() => {
    const unsubscribe = onAuthChange((u: User | null) => {
      if (!u) {
        navigate("/admin");
      } else {
        setUser(u);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    await logout();
    navigate("/admin");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Admin Navbar */}
      <div className="border-b border-white/10 px-4 py-4 flex justify-between items-center" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Cyan Danışmanlık" className="h-10 w-auto" />
          <span className="text-gray-400 text-sm border-l border-white/10 pl-3">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm hidden md:block">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Sekmeler */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {[
            { key: "accounting", label: "Muhasebe" },
            { key: "messages", label: "Mesajlar" },
            { key: "popup", label: "Popup" },
            { key: "blog", label: "Blog Yazıları" },
            { key: "team", label: "Ekip Üyeleri" },
            { key: "settings", label: "Site Ayarları" },


          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "blog" | "team" | "messages" | "popup")}              
              className="px-5 py-2.5 text-sm font-medium transition border-b-2 -mb-px"
              style={{
                borderColor: activeTab === tab.key ? "#06b6d4" : "transparent",
                color: activeTab === tab.key ? "#06b6d4" : "#9ca3af",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* İçerik */}
        {activeTab === "accounting" && <AccountingManager />}
        {activeTab === "messages" && <MessagesManager />}
        {activeTab === "popup" && <PopupManager />}
        {activeTab === "blog" && <BlogManager />}
        {activeTab === "team" && <TeamManager />}
        {activeTab === "settings" && <SiteSettingsManager />}
      </div>
    </div>
  );
}