import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { auth, db } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const texts = [
  "Welcome back! Learn about your body.",
  "Learn medical topics from Expert.",
  "Educate people on medical topics.",
  "Post medical Jobs and send invite for interview."
];

const Login = () => {
  const [index, setIndex] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState("");


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);


const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    let loginEmail = email.trim();


    if (!loginEmail.includes("@")) {
      const ref = doc(db, "usernames", loginEmail.toLowerCase());
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        throw new Error("Username not found");
      }

      const data = snap.data();

      if (!data.email) {
        throw new Error("User email not found in database");
      }

      loginEmail = data.email;
    }

    if (!loginEmail || loginEmail.length < 5) {
      throw new Error("Invalid login email");
    }

    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      password
    );

    const user = userCredential.user;

    const profileRef = doc(db, "users", user.uid);
    const profileSnap = await getDoc(profileRef);

    let username = "";

    if (profileSnap.exists()) {
      username = profileSnap.data().username;
    }

    setWelcomeMessage(`Welcome, ${username}!`);

    setLoading(false);

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);

  } catch (error) {
  console.error(error.code);
  if (error.code === "auth/invalid-credential") {
    alert("Invalid email or password");
  } 
    else {
      alert("Login failed: " + error.message);
    }


  setLoading(false);
}
};

  return (
    <div className="LoginContainer">
      <div className="left">

        <div className="loginHead">
          <h2>Login</h2>

          <div className="subHead">
            <p key={index} className="fade">
              {texts[index]}
            </p>
          </div>
        </div>


        {welcomeMessage && (
          <div style={{ color: "green", marginBottom: "10px", fontWeight: "bold" }}>
            {welcomeMessage}
          </div>
        )}

        <div className="input">
          <form onSubmit={handleLogin}>

            <div className="inputGroup">
              <span className="material-symbols-outlined">
                mark_email_unread
              </span>

              <input
                type="text"
                required
                placeholder="Email address\Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <span className="material-symbols-outlined">lock</span>

              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="forgotPass">
            <div className="forgot">
              <Link to="/resetPassword">Forgot Password?</Link>
            </div>

            <div className="register">
              <Link to="/signup">Register Now</Link>
            </div>
          </div>
        </div>

      </div>

      <div className="right"></div>
    </div>
  );
};

export default Login; 