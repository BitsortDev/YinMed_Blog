

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";


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
            </Routes>
          </div>
        </div>

      </div>
    </Router>

  );
}

export default App;


