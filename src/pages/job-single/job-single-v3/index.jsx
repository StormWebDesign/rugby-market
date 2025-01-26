// src/pages/job-single/job-single-v3/index.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useJobFeatures from "@/data/job-featured"; // Import the custom hook to fetch data dynamically
import { db } from "@/firebase"; // Import Firebase db instance
import { doc, getDoc } from "firebase/firestore"; // Firebase Firestore functions
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job Single Dynamic V3 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const JobSingleDynamicV3 = () => {
  let { id } = useParams(); // Extract the job ID from the URL
  const { jobFeatures, loading } = useJobFeatures(); // Use the custom hook to fetch job data
  const [companyData, setCompanyData] = useState(null); // State for user (company) data
  const [loadingCompany, setLoadingCompany] = useState(true); // State to track if company data is loading

  useEffect(() => {
    const fetchCompanyData = async () => {
      const job = jobFeatures.find((item) => item.id === id); // Find the job that matches the ID
      if (job) {
        const clubName = job.clubName; // Get the clubName from the job data

        // Fetch user data based on clubName
        const userRef = doc(db, "users", clubName); // Reference to the user document in the "users" collection
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setCompanyData(userSnapshot.data()); // Set company data if it exists
        }
      }
      setLoadingCompany(false); // Finished loading company data
    };

    if (!loading && jobFeatures.length > 0) {
      fetchCompanyData(); // Fetch company data once the job features are loaded
    }
  }, [id, jobFeatures, loading]); // Re-run when jobFeatures or id changes

  if (loading || loadingCompany) {
    return <div>Loading job and company details...</div>; // Display loading message if data is still being fetched
  }

  const job = jobFeatures.find((item) => item.id === id); // Find the job that matches the ID
  if (!job || !companyData) {
    return <div>Job or Company not found</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>

      <LoginPopup />
      <DefaulHeader />
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
                        <h4>{job?.jobTitle}</h4>

                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            {companyData?.company}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {job?.location}
                          </li>
                          <li>
                            <span className="icon flaticon-clock-3"></span>{" "}
                            {job?.time}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>{" "}
                            {job?.salary}
                          </li>
                        </ul>

                        <ul className="job-other-info">
                          {job?.jobType?.map((val, i) => (
                            <li key={i} className={`${val.styleClass}`}>
                              {val.type}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="job-overview-two">
                  <h4>Job Description</h4>
                  <JobOverView2 />
                </div>

                <JobDetailsDescriptions />

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
                    <a
                      href="#"
                      className="theme-btn btn-style-one"
                      data-bs-toggle="modal"
                      data-bs-target="#applyJobModal"
                    >
                      Apply For Job
                    </a>
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>

                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">Apply for this job</h3>
                          <button
                            type="button"
                            className="closed-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>

                        <ApplyJobModalContent />
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <img src={companyData.logo} alt="resource" />
                        </div>
                        <h5 className="company-name">{companyData.company}</h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>

                      <CompnayInfo company={companyData} />
                    </div>
                  </div>
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
