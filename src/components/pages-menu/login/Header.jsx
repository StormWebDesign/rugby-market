

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`main-header ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/" className="noSticky">
                  <img
                   
                   src="/images/header-logo.svg"
                   alt="rugby transfer market logo"
                    title="rugby transfer market logo"
                  />
                </Link>
                <Link to="/" className="isSticky">
                  <img
                   
                    src="/images/logo.svg"
                    alt="logo"
                    title="brand"
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* End nav-outer */}

          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default Header;
