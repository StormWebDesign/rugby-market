import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import { db, auth } from "@/firebase"; // Import Firebase
import { doc, getDoc } from "firebase/firestore"; // Firebase Firestore methods

const DashboardHeader = () => {
    const { pathname } = useLocation();
    const [navbar, setNavbar] = useState(false);
    const [logoURL, setLogoURL] = useState("/images/resource/company-6.png"); // Default image
    const [loading, setLoading] = useState(true);

    // Fetch the user's logo URL from Firestore
    const fetchUserLogo = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.club_logoImageURL) {
                        setLogoURL(userData.club_logoImageURL);
                    }
                }
            } catch (err) {
                console.error("Error fetching user logo:", err);
                setLogoURL("/images/resource/company-6.png"); // Fallback if error occurs
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false); // No user logged in, just stop loading
        }
    };

    // Handle scrolling for navbar effect
    const changeBackground = () => {
        if (window.scrollY >= 0) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
        fetchUserLogo(); // Fetch logo when the component mounts
    }, []);

    return (
        <header className={`main-header header-shaddow ${navbar ? "fixed-header" : ""}`}>
            <div className="container-fluid">
                <div className="main-box">
                    <div className="nav-outer">
                        <div className="logo-box">
                            <div className="logo">
                                <Link to="/">
                                    <img alt="brand" src="/images/logo.svg" />
                                </Link>
                            </div>
                        </div>

                        <HeaderNavContent />
                    </div>

                    <div className="outer-box">
                        <button className="menu-btn">
                            <span className="count">1</span>
                            <span className="icon la la-heart-o"></span>
                        </button>

                        <button className="menu-btn">
                            <span className="icon la la-bell"></span>
                        </button>

                        <div className="dropdown dashboard-option">
                            <a
                                className="dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {loading ? (
                                    <img alt="avatar" className="thumb" src="/images/resource/loading-spinner.gif" />
                                ) : (
                                    <img alt="avatar" className="thumb" src={logoURL} />
                                )}
                                <span className="name">My Account</span>
                            </a>

                            <ul className="dropdown-menu">
                                {employerMenuData.map((item) => (
                                    <li
                                        className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                                        key={item.id}
                                    >
                                        <Link to={item.routePath}>
                                            <i className={`la ${item.icon}`}></i> {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
