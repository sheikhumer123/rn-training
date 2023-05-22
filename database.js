import { getApp } from "firebase/app";
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

export const createPostDB = async (postModel) => {
  // Create post DB
  try {
    const docRef = await addDoc(collection(db, "posts"), postModel);
    alert("data posted");
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

export const addUserDetails = async (currentUser) => {
  try {
    console.log(currentUser);
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

export const createUserDB = async (userDetails, currentUser) => {
  try {
    // create user with id: userDetails.id
    await setDoc(doc(db, "users", currentUser.uid), userDetails);
    console.log(userDetails);
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
    console.log("No such document!");
  }
};
