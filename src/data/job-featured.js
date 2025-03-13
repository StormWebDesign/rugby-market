import { useState, useEffect } from "react";
import { db, auth } from "@/firebase"; // Import Firebase auth to get the logged-in user
import { collection, getDocs, query, where } from "firebase/firestore";

const useJobFeatures = () => {
  const [jobFeatures, setJobFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobFeatures = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated");
          setLoading(false);
          return;
        }

        const jobsQuery = query(collection(db, "jobs"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(jobsQuery);

        const jobsArray = [];
        querySnapshot.forEach((doc) => {
          jobsArray.push({ id: doc.id, ...doc.data() });
        });

        setJobFeatures(jobsArray);
      } catch (error) {
        console.error("Error fetching job features: ", error.message);
        if (error.code === "permission-denied") {
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
