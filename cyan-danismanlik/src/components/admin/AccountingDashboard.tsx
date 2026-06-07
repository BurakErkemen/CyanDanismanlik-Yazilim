import { useState, useEffect, useCallback } from "react";
import {
  type Transaction,
  type Customer,
  type Quote,
  type Currency,
  type QuoteItem,
  getTransactions,
  getCustomers,
  getQuotes,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createQuote,
  updateQuote,
  deleteQuote,
  formatCurrency,
  generateQuoteNo,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "@/lib/accountingService";
import { Timestamp } from "firebase/firestore";

type Section = "dashboard" | "income" | "expense" | "customers" | "quotes";

export default function AccountingManager() {
  const [section, setSection] = useState<Section>("dashboard");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    const [t, c, q] = await Promise.all([getTransactions(), getCustomers(), getQuotes()]);
    setTransactions(t);
    setCustomers(c);
    setQuotes(q);
    setLoading(false);
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchAll();
    })();
  }, [fetchAll]);

  const income = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  const totalIncomeTRY = income.filter((t) => t.currency === "TRY").reduce((s, t) => s + t.amount, 0);
  const totalExpenseTRY = expenses.filter((t) => t.currency === "TRY").reduce((s, t) => s + t.amount, 0);
  const netTRY = totalIncomeTRY - totalExpenseTRY;

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500";
  const inputStyle = { backgroundColor: "#1a1a1a" };

  const cardStyle = { backgroundColor: "#111111" };

  if (loading) return <p className="text-gray-400">Yükleniyor...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Muhasebe</h2>
      </div>

      {/* Sekmeler */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10">
        {[
          { key: "dashboard", label: "Özet" },
          { key: "income", label: "Gelirler" },
          { key: "expense", label: "Giderler" },
          { key: "customers", label: "Müşteriler" },
          { key: "quotes", label: "Teklifler" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setSection(s.key as Section)}
            className="px-4 py-2 text-sm font-medium transition border-b-2 -mb-px"
            style={{
              borderColor: section === s.key ? "#06b6d4" : "transparent",
              color: section === s.key ? "#06b6d4" : "#9ca3af",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {section === "dashboard" && (
        <DashboardSection
          transactions={transactions}
          totalIncomeTRY={totalIncomeTRY}
          totalExpenseTRY={totalExpenseTRY}
          netTRY={netTRY}
          customers={customers}
          quotes={quotes}
          cardStyle={cardStyle}
        />
      )}

      {/* Gelirler */}
      {section === "income" && (
        <TransactionSection
          type="income"
          transactions={income}
          customers={customers}
          onRefresh={fetchAll}
          inputClass={inputClass}
          inputStyle={inputStyle}
          cardStyle={cardStyle}
        />
      )}

      {/* Giderler */}
      {section === "expense" && (
        <TransactionSection
          type="expense"
          transactions={expenses}
          customers={customers}
          onRefresh={fetchAll}
          inputClass={inputClass}
          inputStyle={inputStyle}
          cardStyle={cardStyle}
        />
      )}

      {/* Müşteriler */}
      {section === "customers" && (
        <CustomersSection
          customers={customers}
          onRefresh={fetchAll}
          inputClass={inputClass}
          inputStyle={inputStyle}
          cardStyle={cardStyle}
        />
      )}

      {/* Teklifler */}
      {section === "quotes" && (
        <QuotesSection
          quotes={quotes}
          customers={customers}
          onRefresh={fetchAll}
          inputClass={inputClass}
          inputStyle={inputStyle}
          cardStyle={cardStyle}
        />
      )}
    </div>
  );
}

// Dashboard
function DashboardSection({ transactions, totalIncomeTRY, totalExpenseTRY, netTRY, customers, quotes, cardStyle }: {
  transactions: Transaction[];
  totalIncomeTRY: number;
  totalExpenseTRY: number;
  netTRY: number;
  customers: Customer[];
  quotes: Quote[];
  cardStyle: React.CSSProperties;
}) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyIncome = transactions
    .filter((t) => t.type === "income" && t.currency === "TRY" && t.date?.toDate().getMonth() === currentMonth && t.date?.toDate().getFullYear() === currentYear)
    .reduce((s, t) => s + t.amount, 0);

  const monthlyExpense = transactions
    .filter((t) => t.type === "expense" && t.currency === "TRY" && t.date?.toDate().getMonth() === currentMonth && t.date?.toDate().getFullYear() === currentYear)
    .reduce((s, t) => s + t.amount, 0);

  const pendingQuotes = quotes.filter((q) => q.status === "sent").length;
  const acceptedQuotes = quotes.filter((q) => q.status === "accepted").length;

  return (
    <div className="space-y-6">
      {/* Kartlar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Toplam Gelir (TL)", value: formatCurrency(totalIncomeTRY, "TRY"), color: "#06b6d4" },
          { label: "Toplam Gider (TL)", value: formatCurrency(totalExpenseTRY, "TRY"), color: "#f87171" },
          { label: "Net (TL)", value: formatCurrency(netTRY, "TRY"), color: netTRY >= 0 ? "#4ade80" : "#f87171" },
          { label: "Bu Ay Net (TL)", value: formatCurrency(monthlyIncome - monthlyExpense, "TRY"), color: "#a78bfa" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl p-5 border border-white/10" style={cardStyle}>
            <p className="text-gray-400 text-xs mb-2">{card.label}</p>
            <p className="text-xl font-bold" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Bilgi kartları */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Toplam Müşteri", value: customers.length },
          { label: "Bu Ay Gelir (TL)", value: formatCurrency(monthlyIncome, "TRY") },
          { label: "Bekleyen Teklif", value: pendingQuotes },
          { label: "Kabul Edilen Teklif", value: acceptedQuotes },
        ].map((card) => (
          <div key={card.label} className="rounded-xl p-5 border border-white/10" style={cardStyle}>
            <p className="text-gray-400 text-xs mb-2">{card.label}</p>
            <p className="text-lg font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Son işlemler */}
      <div className="rounded-xl p-6 border border-white/10" style={cardStyle}>
        <h3 className="text-white font-semibold mb-4">Son İşlemler</h3>
        {transactions.slice(0, 5).length === 0 ? (
          <p className="text-gray-400 text-sm">Henüz işlem yok.</p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-white">{t.title}</p>
                  <p className="text-gray-500 text-xs">{t.date?.toDate().toLocaleDateString("tr-TR")}</p>
                </div>
                <p className="font-semibold" style={{ color: t.type === "income" ? "#4ade80" : "#f87171" }}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount, t.currency)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// İşlem (Gelir/Gider)
function TransactionSection({ type, transactions, customers, onRefresh, inputClass, inputStyle, cardStyle }: {
  type: "income" | "expense";
  transactions: Transaction[];
  customers: Customer[];
  onRefresh: () => void;
  inputClass: string;
  inputStyle: React.CSSProperties;
  cardStyle: React.CSSProperties;
}) {
  const [view, setView] = useState<"list" | "edit">("list");
  const [editItem, setEditItem] = useState<Transaction | null>(null);
  const [saving, setSaving] = useState(false);

  const empty: Transaction = {
    type,
    title: "",
    amount: 0,
    currency: "TRY",
    category: "",
    customerId: "",
    customerName: "",
    date: Timestamp.now(),
    notes: "",
    invoiceNo: "",
  };

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  async function handleSave() {
    if (!editItem) return;
    if (!editItem.title || !editItem.amount) { alert("Başlık ve tutar zorunludur."); return; }
    setSaving(true);
    try {
      if (editItem.id) {
        await updateTransaction(editItem.id, editItem);
      } else {
        await createTransaction(editItem);
      }
      await onRefresh();
      setView("list");
      setEditItem(null);
    } catch {
      alert("Kayıt hatası.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await deleteTransaction(id);
    await onRefresh();
  }

  const total = transactions.filter((t) => t.currency === "TRY").reduce((s, t) => s + t.amount, 0);

  if (view === "edit" && editItem) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">{editItem.id ? "Düzenle" : type === "income" ? "Yeni Gelir" : "Yeni Gider"}</h3>
          <button onClick={() => { setView("list"); setEditItem(null); }} className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition">Geri Dön</button>
        </div>
        <div className="rounded-xl p-6 border border-white/10 space-y-4" style={cardStyle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Başlık</label>
              <input type="text" value={editItem.title} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} placeholder="İşlem başlığı" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Fatura No</label>
              <input type="text" value={editItem.invoiceNo || ""} onChange={(e) => setEditItem({ ...editItem, invoiceNo: e.target.value })} placeholder="FAT-2026-001" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Tutar</label>
              <input type="number" value={editItem.amount} onChange={(e) => setEditItem({ ...editItem, amount: Number(e.target.value) })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Para Birimi</label>
              <select value={editItem.currency} onChange={(e) => setEditItem({ ...editItem, currency: e.target.value as Currency })} className={inputClass} style={inputStyle}>
                <option value="TRY">TRY — Türk Lirası</option>
                <option value="USD">USD — Amerikan Doları</option>
                <option value="EUR">EUR — Euro</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Kategori</label>
              <select value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} className={inputClass} style={inputStyle}>
                <option value="">Seçin</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Müşteri</label>
              <select
                value={editItem.customerId || ""}
                onChange={(e) => {
                  const c = customers.find((c) => c.id === e.target.value);
                  setEditItem({ ...editItem, customerId: e.target.value, customerName: c?.name || "" });
                }}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Müşteri seçin (opsiyonel)</option>
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.company}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Tarih</label>
              <input
                type="date"
                value={editItem.date?.toDate().toISOString().split("T")[0]}
                onChange={(e) => setEditItem({ ...editItem, date: Timestamp.fromDate(new Date(e.target.value)) })}
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Notlar</label>
            <textarea value={editItem.notes} onChange={(e) => setEditItem({ ...editItem, notes: e.target.value })} rows={3} className={inputClass} style={inputStyle} />
          </div>
          <button onClick={handleSave} disabled={saving} className="w-full font-semibold py-3 rounded-lg transition text-black disabled:opacity-50" style={{ backgroundColor: "#06b6d4" }}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-400 text-sm">Toplam (TL)</p>
          <p className="text-2xl font-bold" style={{ color: type === "income" ? "#4ade80" : "#f87171" }}>
            {formatCurrency(total, "TRY")}
          </p>
        </div>
        <button onClick={() => { setEditItem({ ...empty }); setView("edit"); }} className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm" style={{ backgroundColor: "#06b6d4" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}>
          + {type === "income" ? "Gelir Ekle" : "Gider Ekle"}
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="rounded-xl p-12 border border-white/10 text-center" style={cardStyle}>
          <p className="text-gray-400">Henüz kayıt yok.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="rounded-xl p-4 border border-white/10 flex justify-between items-center gap-4" style={cardStyle}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium text-sm truncate">{t.title}</p>
                  {t.invoiceNo && <span className="text-xs text-gray-500 shrink-0">{t.invoiceNo}</span>}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-gray-500 text-xs">{t.date?.toDate().toLocaleDateString("tr-TR")}</p>
                  {t.category && <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-400">{t.category}</span>}
                  {t.customerName && <span className="text-xs text-gray-500">{t.customerName}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <p className="font-bold text-sm" style={{ color: type === "income" ? "#4ade80" : "#f87171" }}>
                  {formatCurrency(t.amount, t.currency)}
                </p>
                <button onClick={() => { setEditItem({ ...t }); setView("edit"); }} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition">Düzenle</button>
                <button onClick={() => t.id && handleDelete(t.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Müşteriler
function CustomersSection({ customers, onRefresh, inputClass, inputStyle, cardStyle }: {
  customers: Customer[];
  onRefresh: () => void;
  inputClass: string;
  inputStyle: React.CSSProperties;
  cardStyle: React.CSSProperties;
}) {
  const [view, setView] = useState<"list" | "edit">("list");
  const [editItem, setEditItem] = useState<Customer | null>(null);
  const [saving, setSaving] = useState(false);

  const empty: Customer = {
    name: "", email: "", phone: "", company: "",
    taxNumber: "", address: "", notes: "",
    createdAt: Timestamp.now(),
  };

  async function handleSave() {
    if (!editItem) return;
    if (!editItem.name) { alert("İsim zorunludur."); return; }
    setSaving(true);
    try {
      if (editItem.id) {
        await updateCustomer(editItem.id, editItem);
      } else {
        await createCustomer(editItem);
      }
      await onRefresh();
      setView("list");
      setEditItem(null);
    } catch {
      alert("Kayıt hatası.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await deleteCustomer(id);
    await onRefresh();
  }

  if (view === "edit" && editItem) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">{editItem.id ? "Müşteriyi Düzenle" : "Yeni Müşteri"}</h3>
          <button onClick={() => { setView("list"); setEditItem(null); }} className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition">Geri Dön</button>
        </div>
        <div className="rounded-xl p-6 border border-white/10 space-y-4" style={cardStyle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Ad Soyad</label>
              <input type="text" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Şirket</label>
              <input type="text" value={editItem.company} onChange={(e) => setEditItem({ ...editItem, company: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">E-posta</label>
              <input type="email" value={editItem.email} onChange={(e) => setEditItem({ ...editItem, email: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Telefon</label>
              <input type="tel" value={editItem.phone} onChange={(e) => setEditItem({ ...editItem, phone: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Vergi No</label>
              <input type="text" value={editItem.taxNumber} onChange={(e) => setEditItem({ ...editItem, taxNumber: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Adres</label>
            <textarea value={editItem.address} onChange={(e) => setEditItem({ ...editItem, address: e.target.value })} rows={2} className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Notlar</label>
            <textarea value={editItem.notes} onChange={(e) => setEditItem({ ...editItem, notes: e.target.value })} rows={3} className={inputClass} style={inputStyle} />
          </div>
          <button onClick={handleSave} disabled={saving} className="w-full font-semibold py-3 rounded-lg transition text-black disabled:opacity-50" style={{ backgroundColor: "#06b6d4" }}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400 text-sm">{customers.length} müşteri</p>
        <button onClick={() => { setEditItem({ ...empty }); setView("edit"); }} className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm" style={{ backgroundColor: "#06b6d4" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}>
          + Yeni Müşteri
        </button>
      </div>
      {customers.length === 0 ? (
        <div className="rounded-xl p-12 border border-white/10 text-center" style={cardStyle}>
          <p className="text-gray-400">Henüz müşteri yok.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {customers.map((c) => (
            <div key={c.id} className="rounded-xl p-4 border border-white/10 flex justify-between items-center gap-4" style={cardStyle}>
              <div>
                <p className="text-white font-medium">{c.name}</p>
                <p className="text-gray-400 text-sm">{c.company}</p>
                <div className="flex gap-3 mt-1">
                  {c.email && <p className="text-gray-500 text-xs">{c.email}</p>}
                  {c.phone && <p className="text-gray-500 text-xs">{c.phone}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditItem({ ...c }); setView("edit"); }} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition">Düzenle</button>
                <button onClick={() => c.id && handleDelete(c.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Teklifler
function QuotesSection({ quotes, customers, onRefresh, inputClass, inputStyle, cardStyle }: {
  quotes: Quote[];
  customers: Customer[];
  onRefresh: () => void;
  inputClass: string;
  inputStyle: React.CSSProperties;
  cardStyle: React.CSSProperties;
}) {
  const [view, setView] = useState<"list" | "edit">("list");
  const [editItem, setEditItem] = useState<Quote | null>(null);
  const [saving, setSaving] = useState(false);

  const empty: Quote = {
    quoteNo: generateQuoteNo(quotes.length + 1),
    customerId: "",
    customerName: "",
    items: [{ description: "", quantity: 1, unitPrice: 0, total: 0 }],
    subtotal: 0,
    taxRate: 20,
    taxAmount: 0,
    total: 0,
    currency: "TRY",
    status: "draft",
    validUntil: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    createdAt: Timestamp.now(),
    notes: "",
  };

  function recalculate(items: QuoteItem[], taxRate: number) {
    const subtotal = items.reduce((s, i) => s + i.total, 0);
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }

  function updateItem(index: number, field: keyof QuoteItem, value: string | number) {
    if (!editItem) return;
    const updated = editItem.items.map((item, i) => {
      if (i !== index) return item;
      const newItem = { ...item, [field]: value };
      newItem.total = newItem.quantity * newItem.unitPrice;
      return newItem;
    });
    const { subtotal, taxAmount, total } = recalculate(updated, editItem.taxRate);
    setEditItem({ ...editItem, items: updated, subtotal, taxAmount, total });
  }

  function addItem() {
    if (!editItem) return;
    setEditItem({ ...editItem, items: [...editItem.items, { description: "", quantity: 1, unitPrice: 0, total: 0 }] });
  }

  function removeItem(index: number) {
    if (!editItem) return;
    const updated = editItem.items.filter((_, i) => i !== index);
    const { subtotal, taxAmount, total } = recalculate(updated, editItem.taxRate);
    setEditItem({ ...editItem, items: updated, subtotal, taxAmount, total });
  }

  async function handleSave() {
    if (!editItem) return;
    if (!editItem.customerId) { alert("Müşteri seçmelisiniz."); return; }
    setSaving(true);
    try {
      if (editItem.id) {
        await updateQuote(editItem.id, editItem);
      } else {
        await createQuote(editItem);
      }
      await onRefresh();
      setView("list");
      setEditItem(null);
    } catch {
      alert("Kayıt hatası.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await deleteQuote(id);
    await onRefresh();
  }

  async function handleStatusChange(quote: Quote, status: Quote["status"]) {
    if (!quote.id) return;
    await updateQuote(quote.id, { status });
    await onRefresh();
  }

  const statusColors: Record<string, string> = {
    draft: "#9ca3af",
    sent: "#06b6d4",
    accepted: "#4ade80",
    rejected: "#f87171",
  };

  const statusLabels: Record<string, string> = {
    draft: "Taslak",
    sent: "Gönderildi",
    accepted: "Kabul Edildi",
    rejected: "Reddedildi",
  };

  if (view === "edit" && editItem) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">{editItem.id ? "Teklifi Düzenle" : "Yeni Teklif"}</h3>
          <button onClick={() => { setView("list"); setEditItem(null); }} className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition">Geri Dön</button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl p-6 border border-white/10 space-y-4" style={cardStyle}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Teklif No</label>
                <input type="text" value={editItem.quoteNo} onChange={(e) => setEditItem({ ...editItem, quoteNo: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Müşteri</label>
                <select
                  value={editItem.customerId}
                  onChange={(e) => {
                    const c = customers.find((c) => c.id === e.target.value);
                    setEditItem({ ...editItem, customerId: e.target.value, customerName: c?.name || "" });
                  }}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">Müşteri seçin</option>
                  {customers.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.company}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Para Birimi</label>
                <select value={editItem.currency} onChange={(e) => setEditItem({ ...editItem, currency: e.target.value as Currency })} className={inputClass} style={inputStyle}>
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>

          {/* Kalemler */}
          <div className="rounded-xl p-6 border border-white/10 space-y-3" style={cardStyle}>
            <div className="flex justify-between items-center">
              <h4 className="text-white font-semibold">Kalemler</h4>
              <button onClick={addItem} className="text-xs px-3 py-1.5 rounded-lg text-black font-medium" style={{ backgroundColor: "#06b6d4" }}>+ Ekle</button>
            </div>
            {editItem.items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5">
                  <input type="text" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Açıklama" className={inputClass} style={inputStyle} />
                </div>
                <div className="col-span-2">
                  <input type="number" value={item.quantity} onChange={(e) => updateItem(i, "quantity", Number(e.target.value))} placeholder="Adet" className={inputClass} style={inputStyle} />
                </div>
                <div className="col-span-2">
                  <input type="number" value={item.unitPrice} onChange={(e) => updateItem(i, "unitPrice", Number(e.target.value))} placeholder="Birim fiyat" className={inputClass} style={inputStyle} />
                </div>
                <div className="col-span-2">
                  <p className="text-white text-sm px-3 py-3 rounded-lg border border-white/10 text-right" style={{ backgroundColor: "#1a1a1a" }}>
                    {formatCurrency(item.total, editItem.currency)}
                  </p>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 text-sm">✕</button>
                </div>
              </div>
            ))}

            {/* Toplamlar */}
            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Ara Toplam</span>
                <span>{formatCurrency(editItem.subtotal, editItem.currency)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>KDV (%)</span>
                <input
                  type="number"
                  value={editItem.taxRate}
                  onChange={(e) => {
                    const taxRate = Number(e.target.value);
                    const { subtotal, taxAmount, total } = recalculate(editItem.items, taxRate);
                    setEditItem({ ...editItem, taxRate, subtotal, taxAmount, total });
                  }}
                  className="w-20 rounded-lg px-3 py-1 text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-500 text-right"
                  style={{ backgroundColor: "#1a1a1a" }}
                />
              </div>
              <div className="flex justify-between text-gray-400">
                <span>KDV Tutarı</span>
                <span>{formatCurrency(editItem.taxAmount, editItem.currency)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-base border-t border-white/10 pt-2">
                <span>Genel Toplam</span>
                <span style={{ color: "#06b6d4" }}>{formatCurrency(editItem.total, editItem.currency)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6 border border-white/10 space-y-4" style={cardStyle}>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Notlar</label>
              <textarea value={editItem.notes} onChange={(e) => setEditItem({ ...editItem, notes: e.target.value })} rows={3} className={inputClass} style={inputStyle} />
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} className="w-full font-semibold py-3 rounded-lg transition text-black disabled:opacity-50" style={{ backgroundColor: "#06b6d4" }}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400 text-sm">{quotes.length} teklif</p>
        <button onClick={() => { setEditItem({ ...empty }); setView("edit"); }} className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm" style={{ backgroundColor: "#06b6d4" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}>
          + Yeni Teklif
        </button>
      </div>
      {quotes.length === 0 ? (
        <div className="rounded-xl p-12 border border-white/10 text-center" style={cardStyle}>
          <p className="text-gray-400">Henüz teklif yok.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {quotes.map((q) => (
            <div key={q.id} className="rounded-xl p-4 border border-white/10 flex justify-between items-center gap-4" style={cardStyle}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium">{q.quoteNo}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${statusColors[q.status]}20`, color: statusColors[q.status] }}>
                    {statusLabels[q.status]}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{q.customerName}</p>
                <p className="text-gray-500 text-xs mt-1">{q.createdAt?.toDate().toLocaleDateString("tr-TR")}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <p className="font-bold text-sm" style={{ color: "#06b6d4" }}>{formatCurrency(q.total, q.currency)}</p>
                <select
                  value={q.status}
                  onChange={(e) => handleStatusChange(q, e.target.value as Quote["status"])}
                  className="text-xs border border-white/10 rounded-lg px-2 py-1.5 text-gray-400 focus:outline-none"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <option value="draft">Taslak</option>
                  <option value="sent">Gönderildi</option>
                  <option value="accepted">Kabul Edildi</option>
                  <option value="rejected">Reddedildi</option>
                </select>
                <button onClick={() => { setEditItem({ ...q }); setView("edit"); }} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition">Düzenle</button>
                <button onClick={() => q.id && handleDelete(q.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}