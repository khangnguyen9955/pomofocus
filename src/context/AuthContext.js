import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, onSnapshot } from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const uid = user?.uid;
  const email = user?.email;
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        let userRef = doc(db, "users", user.uid);
        onSnapshot(userRef, (snapshot) => {
          setUser(snapshot.data());
          setLogin(true);
        });
      } else {
        setUser({});
        setLogin(false);
      }
    });
    return () => {
      unsubscribed();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user, uid, email, login, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
