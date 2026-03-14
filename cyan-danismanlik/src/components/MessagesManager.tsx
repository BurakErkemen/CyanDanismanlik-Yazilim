import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { type ContactMessage } from "../lib/contactService";

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const q = query(collection(db, "contacts"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ContactMessage)));
    setLoading(false);
  }

  async function handleRead(msg: ContactMessage) {
    if (!msg.id) return;
    await updateDoc(doc(db, "contacts", msg.id), { read: true });
    setSelected({ ...msg, read: true });
    await fetchMessages();
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    await deleteDoc(doc(db, "contacts", id));
    setSelected(null);
    await fetchMessages();
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">Mesajlar</h2>
          {unreadCount > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium text-black"
              style={{ backgroundColor: "#06b6d4" }}
            >
              {unreadCount} yeni
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : messages.length === 0 ? (
        <div
          className="rounded-xl p-12 border border-white/10 text-center"
          style={{ backgroundColor: "#111111" }}
        >
          <p className="text-gray-400">Henüz mesaj yok.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Liste */}
          <div className="space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.read) handleRead(msg); }}
                className="rounded-xl p-4 border cursor-pointer transition"
                style={{
                  backgroundColor: selected?.id === msg.id ? "#1a1a1a" : "#111111",
                  borderColor: !msg.read ? "#06b6d4" : "rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-white font-medium text-sm">{msg.name}</p>
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: "#06b6d4" }} />
                  )}
                </div>
                <p className="text-gray-400 text-xs">{msg.email}</p>
                <p className="text-gray-500 text-xs mt-1 truncate">{msg.message}</p>
                <p className="text-gray-600 text-xs mt-2">
                  {msg.date?.toDate().toLocaleDateString("tr-TR", {
                    day: "numeric", month: "long", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>

          {/* Detay */}
          {selected ? (
            <div
              className="rounded-xl p-6 border border-white/10 h-fit"
              style={{ backgroundColor: "#111111" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white font-semibold">{selected.name}</p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm"
                    style={{ color: "#06b6d4" }}
                  >
                    {selected.email}
                  </a>
                </div>
                <button
                  onClick={() => selected.id && handleDelete(selected.id)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition"
                >
                  Sil
                </button>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-4">
                {selected.message}
              </p>
              <p className="text-gray-600 text-xs mt-4">
                {selected.date?.toDate().toLocaleDateString("tr-TR", {
                  day: "numeric", month: "long", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </p>
              <a
                href={`mailto:${selected.email}`}
                className="mt-4 inline-block text-sm font-medium px-4 py-2 rounded-lg text-black"
                style={{ backgroundColor: "#06b6d4" }}
              >
                Yanıtla
              </a>
            </div>
          ) : (
            <div
              className="rounded-xl p-6 border border-white/10 flex items-center justify-center"
              style={{ backgroundColor: "#111111" }}
            >
              <p className="text-gray-500 text-sm">Mesaj seçin</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}