import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Added updateDoc for Firestore updates
import { Link, useNavigate } from "react-router-dom";
import LoginWithSocial from "./LoginWithSocial";

const FormContent = ({ setSuccessMessage, setErrorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Log in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user details from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User type:", userData.userType);

        // Update lastLogin timestamp in Firestore
        await updateDoc(userDocRef, {
          lastLogin: new Date(), // Set to current timestamp
        });

        // Redirect based on userType
        if (userData.userType === "Player") {
          // Check if the profile is completed
          if (userData.profileCompleted) {
            navigate("/candidates-dashboard/dashboard");
          } else {
            navigate("/candidates-dashboard/my-profile");
          }
        } else if (userData.userType === "Club") {
          // Check if the profile is completed
          if (userData.profileCompleted) {
            navigate("/employers-dashboard/dashboard");
          } else {
            navigate("/employers-dashboard/company-profile");
          }
        } else {
          setErrorMessage("User type is not recognized.");
        }
      } else {
        setErrorMessage("User document does not exist.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Transfer Market</h3>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            data-bs-dismiss="modal"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            to="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
    </div>
  );
};

export default FormContent;
