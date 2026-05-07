

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <NavBar />
          <div className="mainContent">
            <Routes>
            <Route exact path="/" element={<Welcome />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/resetpassword" element={<ResetPassword />}/>
            </Routes>
          </div>
        </div>

      </div>
    </Router>

  );  
}

export default App;


