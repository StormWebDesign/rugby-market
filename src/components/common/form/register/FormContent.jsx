import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db, auth } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FormContent = ({ setSuccessMessage, setErrorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send a verification email
      await sendEmailVerification(user);

      // Create a Firestore document for the user
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      setSuccessMessage("Registration successful! Please check your email to verify your account.");
      
      // Navigate to "My Profile" after the user verifies their email
      user.reload().then(() => {
        if (user.emailVerified) {
          navigate("/my-profile"); // Adjust the route as needed for your app
        }
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
      <button className="theme-btn btn-style-one" type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Create a Free Account"}
      </button>
      </div>
    </form>
  );
};

export default FormContent;
