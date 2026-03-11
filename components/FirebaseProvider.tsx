'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithRedirect, 
  getRedirectResult,
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface FirebaseContextType {
  user: User | null;
  isAuthReady: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  isAuthReady: false,
  signIn: async () => {},
  logOut: async () => {},
});

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Handle the redirect result when user returns from Google login page
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect sign-in successful:", result.user.displayName);
        }
      })
      .catch((error) => {
        console.error("Redirect sign-in error:", error.code, error.message);
      });

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);

      if (currentUser) {
        try {
          await setDoc(doc(db, 'presence', currentUser.uid), {
            lastActive: serverTimestamp()
          });
        } catch (error) {
          console.error("Failed to update presence:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Update presence every minute while logged in
  useEffect(() => {
    if (!user || !isAuthReady) return;

    const interval = setInterval(async () => {
      try {
        await setDoc(doc(db, 'presence', user.uid), {
          lastActive: serverTimestamp()
        });
      } catch (error) {
        console.error("Failed to update presence:", error);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [user, isAuthReady]);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      // Uses redirect instead of popup — works on all browsers without being blocked
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error initiating sign in:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, isAuthReady, signIn, logOut }}>
      {children}
    </FirebaseContext.Provider>
  );
}
