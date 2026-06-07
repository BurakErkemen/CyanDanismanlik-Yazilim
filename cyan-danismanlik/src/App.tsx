import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PopupDisplay from "@/components/site/PopupDisplay";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PageLoader } from "@/components/ui";
import Home from "@/pages/Home";
import Kosgeb from "@/pages/Kosgeb";
import Yazilim from "@/pages/Yazilim";
import ETicaret from "@/pages/ETicaret";
import Blog from "@/pages/Blog";
import Ekip from "@/pages/Ekip";
import TeamDetail from "@/pages/TeamDetail";

// Heavy / rarely-hit routes are split out of the main bundle.
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kosgeb" element={<Kosgeb />} />
          <Route path="/yazilim" element={<Yazilim />} />
          <Route path="/e-ticaret" element={<ETicaret />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/ekip" element={<Ekip />} />
          <Route path="/ekip/:id" element={<TeamDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      {!isAdmin && <PopupDisplay />}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
