export default function Footer() {
  return (
    <footer className="text-sm py-8 mt-16" style={{ backgroundColor: "#111111" }}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400">
        <img src="/logo.png" alt="Cyan Danışmanlık" className="h-32 w-auto" />
        <p>47. Sokak, 17A — İskenderun / Hatay</p>
        <p>+90 (553) 776 31 69</p>
        <p>© 2026 Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}