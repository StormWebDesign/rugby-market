import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

import { useLocation } from "react-router-dom";
import { db, auth } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const DashboardCandidatesSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const [profileSlug, setProfileSlug] = useState(null);

  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // Fetch user's profile slug
  useEffect(() => {
    const fetchProfileSlug = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setProfileSlug(userDoc.data().profileSlug || null);
          }
        } catch (error) {
          console.error("Error fetching profile slug:", error);
        }
      }
    };
    fetchProfileSlug();
  }, []);

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {candidatesuData.map((item) => {
            // Handle external profile link
            if (item.isExternal && item.routePath === "PUBLIC_PROFILE") {
              if (!profileSlug) {
                return (
                  <li
                    className="mb-1"
                    key={item.id}
                    style={{ opacity: 0.5 }}
                    title="Complete your profile to view"
                  >
                    <span style={{ cursor: "not-allowed", display: "block", padding: "10px 20px" }}>
                      <i className={`la ${item.icon}`}></i> {item.name}
                    </span>
                  </li>
                );
              }
              return (
                <li className="mb-1" key={item.id} onClick={menuToggleHandler}>
                  <a
                    href={`/${profileSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`la ${item.icon}`}></i> {item.name}
                  </a>
                </li>
              );
            }

            // Regular menu items
            return (
              <li
                className={`${
                  isActiveLink(item.routePath, pathname) ? "active" : ""
                } mb-1`}
                key={item.id}
                onClick={menuToggleHandler}
              >
                <Link to={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* End navigation */}
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
