import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange, logout } from "@/lib/authService";
import { type User } from "firebase/auth";
import BlogManager from "@/components/admin/BlogManager";
import TeamManager from "@/components/admin/TeamManager";
import MessagesManager from "@/components/admin/MessagesManager";
import PopupManager from "@/components/admin/PopupManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import AccountingManager from "@/components/admin/AccountingDashboard";
import { Container, PageLoader, cn } from "@/components/ui";

type Tab = "accounting" | "messages" | "popup" | "blog" | "team" | "settings";

const tabs: { key: Tab; label: string }[] = [
  { key: "accounting", label: "Muhasebe" },
  { key: "messages", label: "Mesajlar" },
  { key: "popup", label: "Popup" },
  { key: "blog", label: "Blog Yazıları" },
  { key: "team", label: "Ekip Üyeleri" },
  { key: "settings", label: "Site Ayarları" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("accounting");

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

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen">
      {/* Admin header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Cyan Danışmanlık" className="h-10 w-auto" />
            <span className="border-l border-white/10 pl-3 text-sm text-gray-400">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 md:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <Container width="wide" className="py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-1 overflow-x-auto border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "-mb-px whitespace-nowrap border-b-2 px-5 py-2.5 text-sm font-medium transition",
                activeTab === tab.key
                  ? "border-brand text-brand-light"
                  : "border-transparent text-gray-400 hover:text-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "accounting" && <AccountingManager />}
        {activeTab === "messages" && <MessagesManager />}
        {activeTab === "popup" && <PopupManager />}
        {activeTab === "blog" && <BlogManager />}
        {activeTab === "team" && <TeamManager />}
        {activeTab === "settings" && <SiteSettingsManager />}
      </Container>
    </div>
  );
}
