import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getProfileBySlug } from "@/utils/profileSlug";

import MetaComponent from "@/components/common/MetaComponent";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import LoginPopup from "@/components/common/form/login/LoginPopup";

import ProfileHeader from "@/components/public-profile/ProfileHeader";
import ProfileOverview from "@/components/public-profile/ProfileOverview";
import ProfileCareer from "@/components/public-profile/ProfileCareer";
import ProfileEducation from "@/components/public-profile/ProfileEducation";
import ProfileExperience from "@/components/public-profile/ProfileExperience";
import ShareButtons from "@/components/public-profile/ShareButtons";

const PublicProfilePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Validate slug format (must contain a dot)
      if (!slug || !slug.includes(".")) {
        navigate("/404");
        return;
      }

      try {
        const result = await getProfileBySlug(slug);

        if (!result) {
          setError("notfound");
          setLoading(false);
          return;
        }

        // Check privacy setting
        if (result.data.allowSearch === "No") {
          setError("private");
          setLoading(false);
          return;
        }

        setProfile({ ...result.data, id: result.userId });

        // Fetch education subcollection
        const eduSnapshot = await getDocs(
          collection(db, "users", result.userId, "education")
        );
        const eduData = eduSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEducation(eduData);

        // Fetch work experience subcollection
        const expSnapshot = await getDocs(
          collection(db, "users", result.userId, "work_experience")
        );
        const expData = expSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExperience(expData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("error");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug, navigate]);

  if (loading) {
    return (
      <>
        <span className="header-span"></span>
        <DefaulHeader />
        <MobileMenu />
        <section className="candidate-detail-section">
          <div className="auto-container">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading profile...</p>
            </div>
          </div>
        </section>
        <FooterDefault footerStyle="alternate5" />
      </>
    );
  }

  if (error === "notfound") {
    return (
      <>
        <span className="header-span"></span>
        <DefaulHeader />
        <MobileMenu />
        <section className="candidate-detail-section">
          <div className="auto-container">
            <div className="text-center py-5">
              <h2>Profile Not Found</h2>
              <p className="mt-3">
                The profile you're looking for doesn't exist or has been removed.
              </p>
              <a href="/" className="theme-btn btn-style-one mt-4">
                Go to Homepage
              </a>
            </div>
          </div>
        </section>
        <FooterDefault footerStyle="alternate5" />
      </>
    );
  }

  if (error === "private") {
    return (
      <>
        <span className="header-span"></span>
        <DefaulHeader />
        <MobileMenu />
        <section className="candidate-detail-section">
          <div className="auto-container">
            <div className="text-center py-5">
              <h2>Profile Private</h2>
              <p className="mt-3">
                This player has chosen to keep their profile private.
              </p>
              <a href="/" className="theme-btn btn-style-one mt-4">
                Go to Homepage
              </a>
            </div>
          </div>
        </section>
        <FooterDefault footerStyle="alternate5" />
      </>
    );
  }

  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
  const profileUrl = `${window.location.origin}/${slug}`;

  const metadata = {
    title: `${fullName} | Rugby Transfer Market`,
    description: profile.description
      ? profile.description.substring(0, 160)
      : `${fullName} - Rugby Player Profile on Rugby Transfer Market`,
    ogImage: profile.fullImage || profile.thumbnailImage || "/images/default-player.png",
    ogUrl: profileUrl,
    ogType: "profile",
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>

      <LoginPopup />
      <DefaulHeader />
      <MobileMenu />

      {/* Profile Header Section */}
      <section className="candidate-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <ProfileHeader profile={profile} profileUrl={profileUrl} />
          </div>
        </div>

        {/* Profile Content */}
        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              {/* Sidebar */}
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  {/* Player Overview */}
                  <div className="sidebar-widget">
                    <h4 className="widget-title">Player Details</h4>
                    <div className="widget-content">
                      <ProfileOverview profile={profile} />
                    </div>
                  </div>

                  {/* Share Widget */}
                  <div className="sidebar-widget">
                    <h4 className="widget-title">Share Profile</h4>
                    <div className="widget-content">
                      <ShareButtons
                        url={profileUrl}
                        title={`${fullName} - Rugby Player Profile`}
                        description={profile.description}
                      />
                    </div>
                  </div>
                </aside>
              </div>

              {/* Main Content */}
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  {/* About Section */}
                  {profile.description && (
                    <div className="mb-5">
                      <h4>About</h4>
                      <p style={{ whiteSpace: "pre-line" }}>{profile.description}</p>
                    </div>
                  )}

                  {/* Rugby Career */}
                  {profile.clubHistory && profile.clubHistory.length > 0 && (
                    <ProfileCareer clubHistory={profile.clubHistory} />
                  )}

                  {/* Education */}
                  {education.length > 0 && (
                    <ProfileEducation education={education} />
                  )}

                  {/* Work Experience */}
                  {experience.length > 0 && (
                    <ProfileExperience experience={experience} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer Market Branding Footer */}
      <div className="text-center py-4" style={{ backgroundColor: "#f5f7fc" }}>
        <p className="mb-0" style={{ color: "#696969", fontSize: "14px" }}>
          Powered by{" "}
          <a href="/" style={{ color: "#1967d2", fontWeight: 500 }}>
            Rugby Transfer Market
          </a>
        </p>
      </div>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default PublicProfilePage;
