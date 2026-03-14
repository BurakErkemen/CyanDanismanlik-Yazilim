import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Cyan Danışmanlık"
            className="h-20 w-auto"
          />
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-white transition">Ana Sayfa</Link>
          <Link to="/kosgeb" className="hover:text-white transition">KOSGEB</Link>
          <Link to="/yazilim" className="hover:text-white transition">Yazılım</Link>
          <Link to="/e-ticaret" className="hover:text-white transition">E-Ticaret</Link>
          <Link to="/blog" className="hover:text-white transition">Blog</Link>
          <Link to="/ekip" className="hover:text-white transition">Ekibimiz</Link>
        </div>

        <button
          className="md:hidden text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium text-gray-400 border-t border-white/10" style={{ backgroundColor: "#0a0a0a" }}>
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-white pt-3">Ana Sayfa</Link>
          <Link to="/kosgeb" onClick={() => setMenuOpen(false)} className="hover:text-white">KOSGEB</Link>
          <Link to="/yazilim" onClick={() => setMenuOpen(false)} className="hover:text-white">Yazılım</Link>
          <Link to="/e-ticaret" onClick={() => setMenuOpen(false)} className="hover:text-white">E-Ticaret</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)} className="hover:text-white">Blog</Link>
          <Link to="/ekip" onClick={() => setMenuOpen(false)} className="hover:text-white">Ekibimiz</Link>
        </div>
      )}
    </nav>
  );
}