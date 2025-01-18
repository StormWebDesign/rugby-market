import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Form from "./FormContent";
import LoginWithSocial from "./LoginWithSocial";
import { Link } from "react-router-dom";

const Register = () => {
  const [successMessage, setSuccessMessage] = useState(""); // For success messages
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const handleResetMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="form-inner">
      <h3>Create a Free Account</h3>

      <Tabs>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12" onClick={handleResetMessages}>
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Player
              </button>
            </Tab>
            <Tab className="col-lg-6 col-md-12" onClick={handleResetMessages}>
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Club
              </button>
            </Tab>
          </TabList>
        </div>

        {/* Pass the state handlers as props */}
        <TabPanel>
          <Form
            userType="Player"
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </TabPanel>
        <TabPanel>
          <Form
            userType="Club"
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </TabPanel>
      </Tabs>

      {/* Show any success or error messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            to="#"
            className="call-modal login"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            data-bs-target="#loginPopupModal"
          >
            LogIn
          </Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  );
};

export default Register;
