// src/data/job-featured.js
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const useJobFeatures = () => {
  const [jobFeatures, setJobFeatures] = useState([]);  // Make sure this is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobFeatures = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsArray = [];
        querySnapshot.forEach((doc) => {
          jobsArray.push({ id: doc.id, ...doc.data() });
        });
        setJobFeatures(jobsArray);
      } catch (error) {
        console.error("Error fetching job features: ", error.message);
        if (error.code === 'permission-denied') {
          console.error("Permission denied. Check Firestore rules.");
        }
      } finally {
        setLoading(false);
      }
    };
    

    fetchJobFeatures();
  }, []);

  return { jobFeatures, loading };
};

export default useJobFeatures;
