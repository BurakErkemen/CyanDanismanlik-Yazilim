import { useState, useEffect } from "react";
import { getActivePopup, type Popup } from "../lib/popupService";
import { Link } from "react-router-dom";

export default function PopupDisplay() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchPopup() {
      const data = await getActivePopup();
      if (!data) return;
      setPopup(data);
      if (data.showOnLoad) {
        setTimeout(() => setVisible(true), 1000);
      }
    }
    fetchPopup();
  }, []);

  if (!popup) return null;

  const isExternal = popup.buttonLink.startsWith("http");

  return (
    <>
      {/* Sabit açma butonu */}
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-6 right-6 z-40 font-semibold px-4 py-3 rounded-full shadow-lg transition text-black text-sm"
        style={{ backgroundColor: "#06b6d4" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
      >
        🔔 Duyuru
      </button>

      {/* Overlay */}
      {visible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setVisible(false)}
        >
          {/* Popup kutusu */}
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 overflow-hidden"
            style={{ backgroundColor: "#111111" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Görsel */}
            {popup.image && (
              <img
                src={popup.image}
                alt={popup.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              {/* Başlık + Kapat */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-white font-bold text-xl">{popup.title}</h2>
                <button
                  onClick={() => setVisible(false)}
                  className="text-gray-500 hover:text-white transition text-xl ml-4"
                >
                  ✕
                </button>
              </div>

              {/* Mesaj */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {popup.message}
              </p>

              {/* Buton */}
              {popup.buttonText && popup.buttonLink && (
                isExternal ? (
                  <a
                    href={popup.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setVisible(false)}
                    className="block w-full text-center font-semibold py-3 rounded-lg transition text-black"
                    style={{ backgroundColor: "#06b6d4" }}
                  >
                    {popup.buttonText}
                  </a>
                ) : (
                  <Link
                    to={popup.buttonLink}
                    onClick={() => setVisible(false)}
                    className="block w-full text-center font-semibold py-3 rounded-lg transition text-black"
                    style={{ backgroundColor: "#06b6d4" }}
                  >
                    {popup.buttonText}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}