import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  desc: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  title: string;
  photo: string;
  specialties: string[];
  linkedin: string;
  email: string;
  phone: string;
  order: number;
  bio: string;
  education: Education[];
  experience: Experience[];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const q = query(collection(db, "team_members"), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember));
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const snap = await getDoc(doc(db, "team_members", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as TeamMember;
}

export async function createTeamMember(member: Omit<TeamMember, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "team_members"), member);
  return docRef.id;
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<void> {
  await updateDoc(doc(db, "team_members", id), member);
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, "team_members", id));
}