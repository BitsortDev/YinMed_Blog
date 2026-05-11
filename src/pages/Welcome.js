import { Link } from "react-router-dom";

const Welcome = () => {
  const heading = "Create an Account!";
  const user = "User";
  const student = "Student";
  const expert = "Medical Expert";
  const owner = "Recruiter";

  return ( 
    <div className="Welcome">
      
      <div className="heading">
        <h2>{heading}</h2>
      </div>

      <div className="details">
        <p>
          Welcome to YinMed Blog! A social space where users can learn more about their health.
        </p>

        <p>
          Students can explore topics, assignments, and project ideas, and choose mentors 
          for guidance and support.
        </p>

        <p>
          Medical experts can interact with users and students, share knowledge, get hired, 
          and train mentees.
        </p>

        <p>
          Recruiters can post jobs, verify licenses, and invite qualified professionals 
          for interviews.
        </p>
      </div>

      <div className="mainDetails">
        <h3>You can easily sign up as:</h3>

        <div className="choose">
          <Link to="/signup">{user}</Link>
          <Link to="/signup">{student}</Link>
          <Link to="/signup">{expert}</Link> 
          <Link to="/signup">{owner}</Link> 
        </div>
      </div>
    </div>
  );
};

export default Welcome;