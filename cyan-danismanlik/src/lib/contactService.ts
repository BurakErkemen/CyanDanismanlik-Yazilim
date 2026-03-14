import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  date: Timestamp;
  read: boolean;
}

export async function saveContact(data: Omit<ContactMessage, "id">): Promise<void> {
  await addDoc(collection(db, "contacts"), data);
}