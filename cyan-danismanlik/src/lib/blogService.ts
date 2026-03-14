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

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  date: Timestamp;
  published: boolean;
  authorEmail: string;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(db, "blog_posts"),
    where("published", "==", true),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, "blog_posts"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, "blog_posts"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() } as BlogPost;
}

export async function createPost(post: Omit<BlogPost, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "blog_posts"), post);
  return docRef.id;
}

export async function updatePost(id: string, post: Partial<BlogPost>): Promise<void> {
  await updateDoc(doc(db, "blog_posts", id), post);
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "blog_posts", id));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}