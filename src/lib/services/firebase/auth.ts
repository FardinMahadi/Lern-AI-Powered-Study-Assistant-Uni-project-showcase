import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';

import { getFirebaseAuth, getFirebaseFirestore } from './config';

export type SubscriptionTier = 'free' | 'pro' | 'advanced';

export interface UserProfile {
  uid: string;
  email: string;
  tier: SubscriptionTier;
  displayName?: string | null;
  photoURL?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const USERS_COLLECTION = 'users';

const userProfileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(profile: WithFieldValue<UserProfile>) {
    return {
      ...profile,
      updatedAt: serverTimestamp(),
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      uid: data.uid,
      email: data.email,
      tier: data.tier as SubscriptionTier,
      displayName: data.displayName ?? null,
      photoURL: data.photoURL ?? null,
      createdAt: data.createdAt?.toDate?.() ?? null,
      updatedAt: data.updatedAt?.toDate?.() ?? null,
    };
  },
};

const getUserDocRef = (uid: string) =>
  doc(getFirebaseFirestore(), USERS_COLLECTION, uid).withConverter(userProfileConverter);

export const signUp = async (
  email: string,
  password: string,
  options?: { displayName?: string; tier?: SubscriptionTier }
): Promise<{ credential: UserCredential; profile: UserProfile }> => {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  if (options?.displayName) {
    await updateProfile(credential.user, {
      displayName: options.displayName,
    });
  }

  const profile: UserProfile = {
    uid: credential.user.uid,
    email: credential.user.email ?? email,
    tier: options?.tier ?? 'free',
    displayName: credential.user.displayName,
    photoURL: credential.user.photoURL,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(
    getUserDocRef(credential.user.uid),
    {
      ...profile,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  return { credential, profile };
};

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  const auth = getFirebaseAuth();
  await firebaseSignOut(auth);
};

export const getCurrentUser = (): User | null => {
  const auth = getFirebaseAuth();
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void): (() => void) => {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
};

export const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snapshot = await getDoc(getUserDocRef(uid));
  return snapshot.exists() ? snapshot.data() : null;
};

export const upsertUserProfile = async (
  uid: string,
  payload: Partial<UserProfile>
): Promise<void> => {
  await setDoc(
    getUserDocRef(uid),
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const updateUserTier = async (uid: string, tier: SubscriptionTier) => {
  await upsertUserProfile(uid, { tier });
};
