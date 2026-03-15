import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Kosgeb from "./pages/Kosgeb";
import Yazilim from "./pages/Yazilim";
import ETicaret from "./pages/ETicaret";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Ekip from "./pages/Ekip";
import TeamDetail from "./pages/TeamDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PopupDisplay from "./components/PopupDisplay";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
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
      {!isAdmin && <PopupDisplay />}
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;