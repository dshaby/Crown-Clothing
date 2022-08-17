import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from "firebase/auth";
import { Category } from "../../store/categories/categories.types";


const firebaseConfig = {
  apiKey: "AIzaSyBKBxQsBeo5mqRwotmYZza5fYFQQ327onQ",
  authDomain: "crown-clothing-db-c8be0.firebaseapp.com",
  projectId: "crown-clothing-db-c8be0",
  storageBucket: "crown-clothing-db-c8be0.appspot.com",
  messagingSenderId: "334678912682",
  appId: "1:334678912682:web:4d7b35fdbe1983f7b36ad3",
  measurementId: "G-QSCKBTJYXB",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();

export type ObjectToAdd = {
  title: string; //the only thing we know for sure exists on this ObjectToAdd
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(//<T is a generic
  collectionKey: string,
  objectsToAdd: T[]//an array of some object type that we're adding to DB, could be random object type
): Promise<void> => {//all async functions return a Promise, but here our Promise is <void>
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoriesArray = querySnapshot.docs.map((docSnapshot) =>
    docSnapshot.data() as Category
  );
  return categoriesArray;
};

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

  export type AdditionalInfo = {
    displayName?: string;
  }

  export type UserData = {
    createdAt: Date;
    displayName: string;
    email:string;
  }

export const createUserDocFromAuth = async (userAuth: User, additionalInfo = {} as AdditionalInfo): Promise<void | QueryDocumentSnapshot<UserData>> => {
  // if logging out, empty Promise value, not returning anything
  // else, returning a userSnapshot, which has a QueryDocumentsSnapshot datatype from Firebase utils, and it has our UserData in it.
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user" + error);
    }
  } else {
    return userSnapshot as QueryDocumentSnapshot<UserData>;
  }
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  // a special function that gets called .next() whenever observer changes
  // imported from Firebase, and it gives us the User account, with any change 
  onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
