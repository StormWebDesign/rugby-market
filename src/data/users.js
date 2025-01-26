// src/data/users.js

import { db } from "@/firebase"; // Import the db instance from firebase.js
import { collection, getDocs } from "firebase/firestore";

// Fetch users data from Firestore
export const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "users");  // Reference to the "users" collection
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), // Spread the user data into an object
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array if there's an error
  }
};
