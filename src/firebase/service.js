import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "./config";

export const getUserData = async (uid) => {
  const userRef = doc(db, "users", uid);

  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return {};
  }
};

export const addUser = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...data,
    currentSession: {
      date: "",
      taskList: [],
    },
    template: [],
    createdAt: serverTimestamp(),
    modifiedAt: serverTimestamp(),
  });
};
export const updateUser = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    ...data,
    modifiedAt: serverTimestamp(),
  });
};
//
export const addSession = async (uid, data) => {
  const sessionRef = doc(db, "users", uid, "session");

  await addDoc(sessionRef, {
    ...data,
    createdAt: serverTimestamp(),
    modifiedAt: serverTimestamp(),
  });
};

// export const updateCurrentSession = async (uid) => {};
