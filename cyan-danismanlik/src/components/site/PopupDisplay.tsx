import { useState, useEffect } from "react";
import { getActivePopup, type Popup } from "@/lib/popupService";
import { Link } from "react-router-dom";
import { buttonClass, cn } from "@/components/ui";

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
  const ctaClass = cn(buttonClass("primary", "md"), "w-full");

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setVisible(true)}
        className={cn(buttonClass("primary", "sm"), "fixed bottom-6 right-6 z-40 rounded-full shadow-lg")}
      >
        🔔 Duyuru
      </button>

      {/* Overlay */}
      {visible && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() => setVisible(false)}
        >
          <div
            className="glass animate-fade-up w-full max-w-md overflow-hidden rounded-2xl glow-brand"
            onClick={(e) => e.stopPropagation()}
          >
            {popup.image && <img src={popup.image} alt={popup.title} className="h-48 w-full object-cover" />}

            <div className="p-6">
              <div className="mb-3 flex items-start justify-between">
                <h2 className="text-xl font-bold text-white">{popup.title}</h2>
                <button
                  onClick={() => setVisible(false)}
                  className="ml-4 text-xl text-gray-500 transition hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-gray-400">{popup.message}</p>

              {popup.buttonText &&
                popup.buttonLink &&
                (isExternal ? (
                  <a
                    href={popup.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setVisible(false)}
                    className={ctaClass}
                  >
                    {popup.buttonText}
                  </a>
                ) : (
                  <Link to={popup.buttonLink} onClick={() => setVisible(false)} className={ctaClass}>
                    {popup.buttonText}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
