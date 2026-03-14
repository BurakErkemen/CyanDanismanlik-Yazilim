import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Popup {
  id?: string;
  title: string;
  message: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
  showOnLoad: boolean;
}

export async function getActivePopup(): Promise<Popup | null> {
  const q = query(collection(db, "popups"), where("active", "==", true));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() } as Popup;
}

export async function getAllPopups(): Promise<Popup[]> {
  const snapshot = await getDocs(collection(db, "popups"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Popup));
}

export async function createPopup(popup: Omit<Popup, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "popups"), popup);
  return docRef.id;
}

export async function updatePopup(id: string, popup: Partial<Popup>): Promise<void> {
  await updateDoc(doc(db, "popups", id), popup);
}

export async function deletePopup(id: string): Promise<void> {
  await deleteDoc(doc(db, "popups", id));
}