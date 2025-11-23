import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { getFirebaseFirestore } from './config';

const db = () => getFirebaseFirestore();

export const createDocument = async <T extends DocumentData>(
  collectionPath: string,
  data: T,
  options?: { id?: string }
): Promise<DocumentReference<T>> => {
  if (options?.id) {
    const docRef = doc(db(), collectionPath, options.id) as DocumentReference<T>;
    await setDoc(docRef, data);
    return docRef;
  }

  return (await addDoc(collection(db(), collectionPath), data)) as DocumentReference<T>;
};

export const getDocument = async <T extends DocumentData>(
  collectionPath: string,
  id: string
): Promise<T | null> => {
  const docRef = doc(db(), collectionPath, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? (snapshot.data() as T) : null;
};

export const updateDocument = async <T extends DocumentData>(
  collectionPath: string,
  id: string,
  data: Partial<T>
) => {
  const docRef = doc(db(), collectionPath, id) as DocumentReference<T>;
  await updateDoc(docRef, data as T);
};

export const deleteDocument = async (collectionPath: string, id: string) => {
  const docRef = doc(db(), collectionPath, id);
  await deleteDoc(docRef);
};

export const queryDocuments = async <T extends DocumentData>(
  collectionPath: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> => {
  const result = query(collection(db(), collectionPath), ...constraints);
  const snapshot = await getDocs(result);
  return snapshot.docs.map(docSnapshot => docSnapshot.data() as T);
};
