"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import {
  SubscriptionTier,
  UserProfile,
  fetchUserProfile,
  onAuthStateChange,
  signIn as firebaseSignIn,
  signOut as firebaseSignOut,
  signUp as firebaseSignUp,
  updateUserTier,
} from "@/lib/firebase/auth";
import { getMissingFirebaseEnvVars, isFirebaseConfigured } from "@/lib/firebase/config";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  tier: SubscriptionTier | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  changeTier: (nextTier: SubscriptionTier) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const missingEnvVars = getMissingFirebaseEnvVars();
  const firebaseConfigured = isFirebaseConfigured();
  const envErrorMessage =
    missingEnvVars.length > 0
      ? `Firebase environment variables are missing: ${missingEnvVars.join(
          ", "
        )}. Please update your .env.local file.`
      : null;

  useEffect(() => {
    if (!firebaseConfigured) {
      setLoading(false);
      if (process.env.NODE_ENV !== "production" && envErrorMessage) {
        console.warn(envErrorMessage);
      }
      return;
    }

    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const existingProfile = await fetchUserProfile(firebaseUser.uid);
          if (existingProfile) {
            setProfile(existingProfile);
          } else {
            // Fallback profile if Firestore document is missing
            setProfile({
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? "",
              tier: "free",
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            });
          }
        } catch (error) {
          console.error("Failed to load user profile:", error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseConfigured, envErrorMessage]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!firebaseConfigured) {
        throw new Error(envErrorMessage ?? "Firebase is not configured.");
      }
      setLoading(true);
      try {
        await firebaseSignIn(email, password);
      } finally {
        setLoading(false);
      }
    },
    [envErrorMessage, firebaseConfigured]
  );

  const signUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      if (!firebaseConfigured) {
        throw new Error(envErrorMessage ?? "Firebase is not configured.");
      }
      setLoading(true);
      try {
        const { profile: createdProfile } = await firebaseSignUp(email, password, {
          displayName,
        });
        setProfile(createdProfile);
      } finally {
        setLoading(false);
      }
    },
    [envErrorMessage, firebaseConfigured]
  );

  const signOut = useCallback(async () => {
    if (!firebaseConfigured) {
      throw new Error(envErrorMessage ?? "Firebase is not configured.");
    }
    setLoading(true);
    try {
      await firebaseSignOut();
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [envErrorMessage, firebaseConfigured]);

  const changeTier = useCallback(
    async (nextTier: SubscriptionTier) => {
      if (!firebaseConfigured) {
        throw new Error(envErrorMessage ?? "Firebase is not configured.");
      }
      if (!user) {
        throw new Error("You must be signed in to change subscription tier.");
      }

      await updateUserTier(user.uid, nextTier);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              tier: nextTier,
            }
          : prev
      );
    },
    [envErrorMessage, firebaseConfigured, user]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: firebaseConfigured ? user : null,
      profile: firebaseConfigured ? profile : null,
      tier: firebaseConfigured ? (profile?.tier ?? null) : null,
      loading,
      signIn,
      signUp,
      signOut,
      changeTier,
    }),
    [firebaseConfigured, user, profile, loading, signIn, signUp, signOut, changeTier]
  );

  return (
    <AuthContext.Provider value={value}>
      {!firebaseConfigured && envErrorMessage && (
        <div
          style={{
            padding: "12px 16px",
            margin: "12px",
            borderRadius: 12,
            backgroundColor: "rgba(255, 99, 71, 0.12)",
            border: "1px solid rgba(255, 99, 71, 0.4)",
            color: "rgb(179, 38, 30)",
            fontSize: "0.95rem",
          }}
        >
          <strong>Firebase configuration missing.</strong> {envErrorMessage}
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
