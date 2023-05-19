import { getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const app = getApp();
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
