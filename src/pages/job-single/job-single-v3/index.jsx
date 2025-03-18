import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import CompanyInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job Listing || Rugby Transfer Market",
  description: "Find the best rugby jobs!",
};

const JobSingleDynamicV3 = () => {
  let { id } = useParams(); // Extract the job ID from the URL
  const [job, setJob] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobAndCompany = async () => {
      try {
        // Fetch Job Data
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
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndCompany();
  }, [id]);

  if (loading) {
    return <div>Loading job and company details...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
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
                  <h4>Job Description</h4>
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
                      </div>
                    </div>
                  </div>

                  {companyData && (
                    <div className="sidebar-widget company-widget">
                      <div className="widget-content">
                        <div className="company-title">
                          <div className="company-logo">
                            <img
                              src={companyData.club_logoImageURL}
                              alt={companyData.clubName}
                            />
                          </div>
                          <h5 className="company-name">
                            {companyData.clubName}
                          </h5>
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
