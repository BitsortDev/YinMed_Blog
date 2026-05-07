import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Check if username exists
  const checkUsernameExists = async (username) => {
    const ref = doc(db, "usernames", username.toLowerCase());
    const snap = await getDoc(ref);
    return snap.exists();
  };

  // Live username checker
  useEffect(() => {
    if (!username) {
      setUsernameError("");
      setUsernameAvailable(null);
      return;
    }

    // Clear old messages immediately user types again
    setUsernameError("");
    setUsernameAvailable(null);

    const delayCheck = setTimeout(async () => {
      setCheckingUsername(true);

      const exists = await checkUsernameExists(username);

      if (exists) {
        setUsernameError("Username already taken");
        setUsernameAvailable(false);

        // Remove error after 2 seconds
        setTimeout(() => {
          setUsernameError("");
        }, 2000);

      } else {
        setUsernameAvailable(true);

        // Remove success message after 2 seconds
        setTimeout(() => {
          setUsernameAvailable(null);
        }, 2000);
      }

      setCheckingUsername(false);

    }, 500);

    return () => clearTimeout(delayCheck);

  }, [username]);

  // Signup function
  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !username ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (phone.length !== 11) {
      alert("Phone number must be 11 digits");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (usernameError || usernameAvailable === false) {
      alert("Please choose a valid username");
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

      // Save user data
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username: username.toLowerCase(),
        phone,
        email,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      // Save username collection
      await setDoc(doc(db, "usernames", username.toLowerCase()), {
        uid: user.uid,
        email: email.trim(),
        phoneNumber: phone.trim(),
        fullName: fullName.trim(),
        createdAt: serverTimestamp(),
      });

      setSuccessMsg(
        `Welcome ${username}, account created successfully!`
      );

      // Clear form
      setFullName("");
      setUsername("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setLoading(false);

      // Redirect
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (error) {
      console.error(error.message);

      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use by another user");
      } else {
        alert(error.message);
      }

      setLoading(false);
    }
  };


  const isFormValid =
  fullName &&
  username &&
  phone.length === 11 &&
  email &&
  password &&
  confirmPassword &&
  !usernameError &&
  usernameAvailable !== false &&
  !phoneError;

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

        <form
          onSubmit={handleSignup}
          className="AccountForm"
        >

         
          <div className="AccountInput">
            <span className="material-symbols-outlined">
              id_card
            </span>

            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />
          </div>

         
          <div className="AccountInput">
            <span className="material-symbols-outlined">
              person
            </span>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.toLowerCase()
                )
              }
            />
          </div>

          
          {checkingUsername && (
            <p
              style={{
                fontSize: "13px",
                color: "gray",
              }}
            >
              Checking username...
            </p>
          )}

          {!checkingUsername &&
            usernameAvailable === true && (
              <p
                style={{
                  fontSize: "13px",
                  color: "green",
                }}
              >
                Username is available
              </p>
            )}

          {usernameError && (
            <p
              style={{
                fontSize: "13px",
                color: "red",
              }}
            >
              {usernameError}
            </p>
          )}

         
          <div className="AccountInput">
            <span className="material-symbols-outlined">
              contact_phone
            </span>

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;

               
                const onlyNumbers =
                  value.replace(/\D/g, "");

                
                setPhone(
                  onlyNumbers.slice(0, 11)
                );

                
                if (/[^0-9]/.test(value)) {
                  setPhoneError(
                    "Only numbers are allowed"
                  );

                } else if (
                  onlyNumbers.length < 11
                ) {
                  setPhoneError(
                    "Phone number must be 11 digits"
                  );

                } else {
                  setPhoneError("");
                }
              }}
              className={
                phoneError ? "inputError" : ""
              }
            />
          </div>

          
          {phoneError && (
            <p
              style={{
                fontSize: "13px",
                color: "red",
              }}
            >
              {phoneError}
            </p>
          )}

        
          <div className="AccountInput">
            <span className="material-symbols-outlined">
              mail
            </span>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          
          <div className="AccountInput">
            <span className="material-symbols-outlined">
              lock
            </span>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

         
          <div className="AccountInput">
            <span className="material-symbols-outlined">
              lock
            </span>

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />
          </div>

         
          <button
             type="submit"
             disabled={loading || !isFormValid}
                  style={{
                  opacity: loading || !isFormValid ? 0.5 : 1,
                  cursor: loading || !isFormValid ? "not-allowed" : "pointer",
                        }}>
                       {loading ? "Creating account..." : "Register"}
            </button>

         
          <div>
            <Link to="/login">
              Already Have an Account? login now!
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;