import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type Currency = "TRY" | "USD" | "EUR";
export type TransactionType = "income" | "expense";
export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected";

export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  taxNumber: string;
  address: string;
  notes: string;
  createdAt: Timestamp;
}

export interface Transaction {
  id?: string;
  type: TransactionType;
  title: string;
  amount: number;
  currency: Currency;
  category: string;
  customerId?: string;
  customerName?: string;
  date: Timestamp;
  notes: string;
  invoiceNo?: string;
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id?: string;
  quoteNo: string;
  customerId: string;
  customerName: string;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: Currency;
  status: QuoteStatus;
  validUntil: Timestamp;
  createdAt: Timestamp;
  notes: string;
}

// Müşteriler
export async function getCustomers(): Promise<Customer[]> {
  const q = query(collection(db, "customers"), orderBy("name", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Customer));
}

export async function createCustomer(c: Omit<Customer, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "customers"), c);
  return ref.id;
}

export async function updateCustomer(id: string, c: Partial<Customer>): Promise<void> {
  await updateDoc(doc(db, "customers", id), c);
}

export async function deleteCustomer(id: string): Promise<void> {
  await deleteDoc(doc(db, "customers", id));
}

// İşlemler
export async function getTransactions(): Promise<Transaction[]> {
  const q = query(collection(db, "transactions"), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));
}

export async function getTransactionsByType(type: TransactionType): Promise<Transaction[]> {
  const q = query(
    collection(db, "transactions"),
    where("type", "==", type),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));
}

export async function createTransaction(t: Omit<Transaction, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "transactions"), t);
  return ref.id;
}

export async function updateTransaction(id: string, t: Partial<Transaction>): Promise<void> {
  await updateDoc(doc(db, "transactions", id), t);
}

export async function deleteTransaction(id: string): Promise<void> {
  await deleteDoc(doc(db, "transactions", id));
}

// Teklifler
export async function getQuotes(): Promise<Quote[]> {
  const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quote));
}

export async function createQuote(q: Omit<Quote, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "quotes"), q);
  return ref.id;
}

export async function updateQuote(id: string, q: Partial<Quote>): Promise<void> {
  await updateDoc(doc(db, "quotes", id), q);
}

export async function deleteQuote(id: string): Promise<void> {
  await deleteDoc(doc(db, "quotes", id));
}

// Yardımcı fonksiyonlar
export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function generateQuoteNo(index: number): string {
  const year = new Date().getFullYear();
  return `TKF-${year}-${String(index).padStart(4, "0")}`;
}

export const INCOME_CATEGORIES = [
  "KOSGEB Danışmanlık",
  "Yazılım Geliştirme",
  "E-Ticaret Danışmanlık",
  "Sosyal Medya Yönetimi",
  "Diğer",
];

export const EXPENSE_CATEGORIES = [
  "Ofis Giderleri",
  "Yazılım & Araçlar",
  "Pazarlama",
  "Ulaşım",
  "Vergi & Sigorta",
  "Diğer",
];