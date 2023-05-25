import { getApp } from "firebase/app";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const app = getApp();
const storage = getStorage();
const db = getFirestore(app);

export const addUserDetails = async (currentUser) => {
  try {
    await setDoc(doc(db, "users", currentUser.uuid), {});
  } catch (error) {
    console.log(error);
  }
};

export const picUriDatabase = async (uri) => {
  const name = uuidv4();
  const filename = `${name}.jpg`;
  const imageRef = ref(storage, `user_images/${filename}`);
  const response = await fetch(uri);
  const blob = await response.blob();
  await uploadBytes(imageRef, blob);
  return await getDownloadURL(imageRef);
};

export const createUserDB = async (userDetails, uid) => {
  try {
    await setDoc(doc(db, "users", uid), userDetails);
  } catch (error) {
    console.log(error);
  }
};

export const getUserDB = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
  }
};

export const postPicUplad = async (uri) => {
  const name = uuidv4();
  const filename = `${name}.jpg`;
  const imageRef = ref(storage, `post_images/${filename}`);

  const response = await fetch(uri);
  const blob = await response.blob();

  await uploadBytes(imageRef, blob);

  return await getDownloadURL(imageRef);
};

export const createPostDb = async (postDetail, currentUser) => {
  console.log(postDetail);
  try {
    const docRef = await addDoc(collection(db, "posts"), postDetail);
    console.log(docRef.id);
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  let posts = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
};

export const updateUserPass = async (pass, currentPass) => {
  const auth = getAuth();

  const user = auth.currentUser;

  const newPassword = pass;

  const credential = EmailAuthProvider.credential(user.email, currentPass);

  try {
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);

    console.log("Password updated successfully.");
  } catch (error) {
    console.log(error);
  }
};
