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
  query,
  where,
  updateDoc,
  arrayUnion,
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

export const postPicUpload = async (uri) => {
  const name = uuidv4();
  const filename = `${name}.jpg`;
  const imageRef = ref(storage, `post_images/${filename}`);
  const response = await fetch(uri);
  const blob = await response.blob();
  await uploadBytes(imageRef, blob);
  return await getDownloadURL(imageRef);
};

export const createPostDb = async (postDetail) => {
  try {
    const docRef = doc(db, "posts", postDetail.post_id);
    await setDoc(docRef, postDetail);
    console.log("Post created successfully!");
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
  } catch (error) {
    console.log(error);
  }
};

export const commented = async ({ postID, comment }) => {
  const q = query(collection(db, "posts"), where("post_id", "==", postID));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    const postId = doc.id;
    const comments = doc.data().comments || []; // Get the existing comments or initialize an empty array
    const newComment = comment; // Example comment object, replace with your own logic
    comments.push(newComment); // Push the new comment into the comments array
    try {
      await updateDoc(doc.ref, {
        comments: arrayUnion(newComment),
      }); // Update the comments field in Firestore
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  });
};

export const getComments = async ({ postID }) => {
  const q = query(collection(db, "posts"), where("post_id", "==", postID));
  const querySnapshot = await getDocs(q);
  const comments = querySnapshot.docs.flatMap((doc) => {
    const postComments = doc.data().comments || [];
    return postComments;
  });
  return comments;
};

export const likeFunction = async ({ currentUser, like, post }) => {
  const q = query(
    collection(db, "posts"),
    where("post_id", "==", post.post_id)
  );
  const querySnapshot = await getDocs(q);
  const updatePromises = []; // Array to store update promises

  for (const doc of querySnapshot.docs) {
    const likes = doc.data().likes || []; // Get the existing likes or initialize an empty array
    const existingLikeIndex = likes.findIndex(
      (l) => l.user_id === currentUser.uid
    ); // Find the index of the existing like with the same user_id
    if (existingLikeIndex !== -1) {
      likes.splice(existingLikeIndex, 1); // Remove the existing like with the same user_id
    } else {
      likes.push(like); // Add the new like to the likes array
    }
    const updatePromise = updateDoc(doc.ref, { likes: likes });
    updatePromises.push(updatePromise); // Add the update promise to the array
  }
  // Wait for all update promises to complete
  await Promise.all(updatePromises);
};

export const getLikesLength = async (postId) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const post = docSnap.data();
    const likesLength = post.likes ? post.likes.length : 0;
    return likesLength;
  } else {
  }
};
