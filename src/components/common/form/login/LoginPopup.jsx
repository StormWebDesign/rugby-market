import { useState } from "react";
import Register from "../register/Register";
import FormContent from "./FormContent";

const LoginPopup = () => {
  const [successMessage, setSuccessMessage] = useState(""); // For success messages
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  return (
    <>
      <div className="modal fade" id="loginPopupModal">
        <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            ></button>

            <div className="modal-body">
              <div id="login-modal">
                <div className="login-form default-form">
                  <FormContent
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="registerModal">
        <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            ></button>

            <div className="modal-body">
              <div id="login-modal">
                <div className="login-form default-form">
                  <Register />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
};

export default LoginPopup;
