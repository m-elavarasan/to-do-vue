import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import firebaseConfig from "@/firebaseConfig";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default {
  async getData(collectionName) {
    try {
      const snapshot = await getDocs(collection(firestore, collectionName));
      return snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
    } catch (error) {
      console.error("Error getting data from Firestore:", error);
    }
  },
  
  async postData(collectionName, data) {
    try {
      await addDoc(collection(firestore, collectionName), data);
    } catch (error) {
      console.error("Error posting data to Firestore:", error);
    }
  },
  async updateData(collectionName, docId, data) {
    try {
      const docRef = doc(firestore, collectionName, docId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating data in Firestore:", error);
    }
  }
};
