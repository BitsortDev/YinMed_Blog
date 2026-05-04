import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password || !confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

    
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username,
        phone,
        email,
        uid: user.uid,
        createdAt: serverTimestamp()
      });

      setSuccessMsg(` Welcome ${username} to YinMed, account created successfully!`);

      setFullName("");
      setUsername("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setLoading(false);

    
      setTimeout(() => {
        window.location.reload();
      }, 2500);

    } catch (error) {
      console.error(error.message);
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="AccountContainer">

      <div className="AccountLeft">

        <h2>Create Account</h2>

        <div className="subAccHead">
          Register to get access to Valid Medical Information
        </div>

  
        {successMsg && (
          <div className="successPopup">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="AccountForm">

          <div className="AccountInput">
            <span className="material-symbols-outlined">id_card</span>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="AccountInput">
            <span className="material-symbols-outlined">person</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="AccountInput">
            <span className="material-symbols-outlined">contact_phone</span>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="AccountInput">
            <span className="material-symbols-outlined">mail</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="AccountInput">
            <span className="material-symbols-outlined">lock</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="AccountInput">
            <span className="material-symbols-outlined">lock</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <div><Link to="/login">Already Have an Account? login now!</Link> </div>

        </form>
      </div>

    

      
    </div>
  );
};

export default SignUp;