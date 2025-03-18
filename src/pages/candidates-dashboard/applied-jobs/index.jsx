import { useEffect, useState } from "react";
import { db, auth } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AppliedJobs from "@/components/dashboard-pages/candidates-dashboard/applied-jobs";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Applied Jobs || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const AppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(collection(db, "applications"), where("playerId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const jobsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAppliedJobs(jobsArray);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      <AppliedJobs appliedJobs={appliedJobs} loading={loading} />
    </>
  );
};

export default AppliedJobsPage;
