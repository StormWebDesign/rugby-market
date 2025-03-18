import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "@/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import CompanyInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
import MetaComponent from "@/components/common/MetaComponent";
import LoadingSpinner from "@/components/common/LoadingSpinner"; // Import the new component

const metadata = {
  title: "Job Listing || Rugby Transfer Market",
  description: "Find the best rugby jobs!",
};

const JobSingleDynamicV3 = () => {
  let { id } = useParams(); // Extract the job ID from the URL

  const [job, setJob] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    const fetchJobAndCompany = async () => {
      try {
        const jobRef = doc(db, "jobs", id);
        const jobSnap = await getDoc(jobRef);

        if (!jobSnap.exists()) {
          setLoading(false);
          return;
        }

        const jobData = jobSnap.data();
        setJob(jobData);

        // Fetch Company Data
        if (jobData.userId) {
          const userRef = doc(db, "users", jobData.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setCompanyData(userSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching job or company:", error);
      }
    };

    const checkUserStatus = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            setUserId(user.uid);
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setUserType(userSnap.data().userType);
            }

            // ✅ Check if the user has applied for this job
            const applicationsRef = collection(db, "applications");
            const querySnapshot = await getDocs(
              query(applicationsRef, where("playerId", "==", user.uid), where("jobId", "==", id))
            );

            if (!querySnapshot.empty) {
              const application = querySnapshot.docs[0].data();
              setAppliedDate(application.timestamp.toDate()); // ✅ Store application timestamp
            } else {
              setAppliedDate(null); // ✅ Ensure the state resets if no application is found
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
        setLoading(false);
      });
    };

    fetchJobAndCompany();
    checkUserStatus();
  }, [id]);


  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const suffixes = ["th", "st", "nd", "rd"];
    const relevantSuffix = suffixes[(day % 10) - 1] || "th"; // Handles 11th, 12th, 13th cases correctly
    return `${day}${relevantSuffix} ${month} ${year}`;
  };


  const [appliedDate, setAppliedDate] = useState(null); // ✅ Track application date

  const handleApply = async () => {
    if (!job || !userId) return;

    try {
      // Store application in Firestore
      await addDoc(collection(db, "applications"), {
        jobId: id,
        jobTitle: job.jobTitle,
        clubName: job.clubName,
        playerId: userId,
        timestamp: new Date(),
      });

      // ✅ Show success message
      setApplicationSubmitted(true);

      setTimeout(() => {
        document.getElementById("applyJobModal").classList.remove("show");
        document.getElementById("applyJobModal").style.display = "none";
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-backdrop")?.remove();
        setApplicationSubmitted(false);
      }, 2000); // Auto-close modal after 2 seconds
    } catch (error) {
      console.error("Error applying:", error);
    }
  };



  if (loading) {
    return <LoadingSpinner />;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>

      <LoginPopup />
      {userType === "Player" ? <DashboardCandidatesHeader /> : <DefaulHeader />}
      <MobileMenu />

      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content">
                        <h4>{job.jobTitle}</h4>

                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            {companyData?.company || "Unknown Company"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {job.city}, {job.country}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>{" "}
                            £{job.offeredSalary}
                          </li>
                        </ul>

                        <ul className="job-other-info">
                          {job.positions?.map((pos, i) => (
                            <li key={i} className="badge bg-primary">
                              {pos}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="job-overview-two">
                  <h4>Details</h4>
                  <JobOverView2 job={job} />
                </div>

                <JobDetailsDescriptions job={job} />

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="btn-box">
                    {userType === "Player" ? (
                      appliedDate !== null ? (
                        <p className="text-success">
                          You applied for this job on <strong>{formatDate(appliedDate)}</strong>.
                        </p>
                      ) : (
                        <button
                          className="theme-btn btn-style-one"
                          data-bs-toggle="modal"
                          data-bs-target="#applyJobModal"
                        >
                          Apply For Job
                        </button>
                      )
                    ) : (
                      <button
                        className="theme-btn btn-style-one"
                        data-bs-toggle="modal"
                        data-bs-target="#loginPopupModal"
                      >
                        Login to Apply
                      </button>
                    )}
                  </div>



                  {/* ✅ Apply Job Modal */}
                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-labelledby="applyJobModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="applyJobModalLabel">
                            {applicationSubmitted ? "Application Submitted" : "Ready to Apply?"}
                          </h5>

                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body text-center">
                          {applicationSubmitted ? (
                            <p className="text-success">Thank you, your application has been submitted!</p>
                          ) : (
                            <>
                              <p>Click "Submit Application" to apply for this job.</p>
                              <button className="theme-btn btn-style-one" onClick={handleApply}>
                                Submit Application
                              </button>
                            </>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>


                  {companyData && (
                    <div className="sidebar-widget company-widget">
                      <div className="widget-content">
                        <div className="company-title">
                          <div className="company-logo">
                            <img src={companyData.club_logoImageURL} alt={companyData.clubName} />
                          </div>
                          <h5 className="company-name">{companyData.clubName}</h5>
                          <a href="#" className="profile-link">
                            View company profile
                          </a>
                        </div>

                        <CompanyInfo company={companyData} />
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault />
    </>
  );
};

export default JobSingleDynamicV3;
