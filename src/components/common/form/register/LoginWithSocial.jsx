import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import PropTypes from "prop-types";

const LoginWithSocial = ({ setSuccessMessage, setErrorMessage }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user to Firestore if this is the first login
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      }, { merge: true });

      setSuccessMessage("Successfully logged in with Google!");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="btn-box row">
      <div className="col-lg-6 col-md-12">
        <a href="#" className="theme-btn social-btn-two facebook-btn">
          <i className="fab fa-facebook-f"></i> Log In via Facebook
        </a>
      </div>
      <div className="col-lg-6 col-md-12">
        <button type="button" className="theme-btn social-btn-two google-btn" onClick={handleGoogleLogin}>
          <i className="fab fa-google"></i> Log In with Google
        </button>
      </div>
    </div>
  );
};

LoginWithSocial.propTypes = {
  setSuccessMessage: PropTypes.func,
  setErrorMessage: PropTypes.func,
};

export default LoginWithSocial;
