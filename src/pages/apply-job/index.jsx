import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "@/firebase";
import { doc, getDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import MetaComponent from "@/components/common/MetaComponent";
import ApplyJobForm from "@/components/apply-job/ApplyJobForm";

const metadata = {
  title: "Apply for Job || Rugby Transfer Market",
  description: "Find the best rugby jobs!",
};

const ApplyJob = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [job, setJob] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const user = auth.currentUser;
      if (!user) {
        setErrorMessage("You need to be logged in to apply.");
        return;
      }

      try {
        // Fetch Player Data
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const playerData = userSnap.data();
          setPlayer(playerData);
          setUserType(playerData.userType);
          setFormData({
            fullName: playerData.fullName || "",
            email: playerData.email || "",
            phone: playerData.phone || "",
            position: playerData.position || "",
            experience: playerData.experience || "",
          });
        } else {
          setErrorMessage("User profile not found.");
        }

        // Fetch Job Data
        const jobRef = doc(db, "jobs", id);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          setJob(jobSnap.data());
        } else {
          setErrorMessage("Job not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to load application details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Handle input changes for updating player details
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle application submission
  const handleApply = async () => {
    if (!player || !job) {
      setErrorMessage("Missing player or job details.");
      return;
    }

    try {
      // Update player's Firestore profile
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
      });

      // Store application in Firestore
      await addDoc(collection(db, "applications"), {
        jobId: id,
        jobTitle: job.jobTitle,
        clubName: job.clubName,
        playerId: auth.currentUser.uid,
        playerName: formData.fullName,
        playerEmail: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        timestamp: new Date(),
      });

      alert("Application submitted successfully!");
      navigate("/candidates-dashboard/applied-jobs"); // ✅ Redirect after submission
    } catch (error) {
      console.error("Error applying:", error);
      setErrorMessage("Failed to submit application.");
    }
  };

  if (loading) return <div>Loading application details...</div>;
  if (errorMessage) return <div className="error-message">{errorMessage}</div>;

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>

      <LoginPopup />
      {userType === "Player" ? <DashboardCandidatesHeader /> : <DefaulHeader />}
      <MobileMenu />

      <section className="apply-job-section">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <ApplyJobForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleApply={handleApply}
                job={job}
              />
            </div>
          </div>
        </div>
      </section>

      <FooterDefault />
    </>
  );
};

export default ApplyJob;
