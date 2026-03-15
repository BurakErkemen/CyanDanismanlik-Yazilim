import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

export async function login(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function createUser(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function isAdmin(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  const tokenResult = await user.getIdTokenResult(true);
  return tokenResult.claims.admin === true;
}