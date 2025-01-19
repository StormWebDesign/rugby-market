import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "@/firebase"; // Import your Firebase config
import { doc, getDoc } from "firebase/firestore";

import candidatesMenuData from "../../data/candidatesMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";

const DashboardCandidatesHeader = () => {
    const { pathname } = useLocation();
    const [navbar, setNavbar] = useState(false);
    const [userType, setUserType] = useState(null); // State for userType
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

    // Handle background change on scroll
    const changeBackground = () => {
        if (window.scrollY >= 0) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setIsLoggedIn(true); // User is logged in
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.userType) {
                            setUserType(userData.userType); // Set the userType
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Determine the link based on userType and login status
    const getLinkPath = () => {
        if (isLoggedIn) {
            if (userType === "Player") {
                return "/candidates-dashboard/dashboard";
            } else if (userType === "Club") {
                return "/employers-dashboard/dashboard";
            }
        }
        return "/"; // Default link for non-logged-in users
    };

    // Add scroll listener
    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
        return () => window.removeEventListener("scroll", changeBackground); // Clean up listener
    }, []);

    return (
        <header
            className={`main-header header-shaddow ${
                navbar ? "fixed-header " : ""
            }`}
        >
            <div className="container-fluid">
                <div className="main-box">
                    <div className="nav-outer">
                        <div className="logo-box">
                            <div className="logo">
                                <Link to={getLinkPath()}>
                                    <img
                                        alt="brand"
                                        src="/images/logo-horizontal-transfer-market.svg"
                                    />
                                </Link>
                            </div>
                        </div>
                        {/* End .logo-box */}

                        <HeaderNavContent />
                        {/* <!-- Main Menu End--> */}
                    </div>
                    {/* End .nav-outer */}

                    <div className="outer-box">
                        <button className="menu-btn">
                            <span className="count">1</span>
                            <span className="icon la la-heart-o"></span>
                        </button>
                        {/* wishlisted menu */}

                        <button className="menu-btn">
                            <span className="icon la la-bell"></span>
                        </button>
                        {/* End notification-icon */}

                        {/* <!-- Dashboard Option --> */}
                        <div className="dropdown dashboard-option">
                            <a
                                className="dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    alt="avatar"
                                    className="thumb"
                                    src="/images/resource/candidate-1.png"
                                />
                                <span className="name">My Account</span>
                            </a>

                            <ul className="dropdown-menu">
                                {candidatesMenuData.map((item) => (
                                    <li
                                        className={`${
                                            isActiveLink(
                                                item.routePath,
                                                pathname
                                            )
                                                ? "active"
                                                : ""
                                        } mb-1`}
                                        key={item.id}
                                    >
                                        <Link to={item.routePath}>
                                            <i
                                                className={`la ${item.icon}`}
                                            ></i>{" "}
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* End dropdown */}
                    </div>
                    {/* End outer-box */}
                </div>
            </div>
        </header>
    );
};

export default DashboardCandidatesHeader;
