import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import "./App.css";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import SeniorLanding from "./components/SeniorLanding";
import Student from "./pages/Student.jsx";
import Resources from "./pages/Resources.jsx";
import StudentLayout from "./Layouts/StudentLayout.jsx";
import AnnaUniversityMarkingSystem from "./pages/MarkingSystem.jsx";
import Scholarship from "./pages/Scholarship.jsx";
import DefaultLayout from "./Layouts/DefaultLayout.jsx";
import SeniorUploadPage from "./pages/SeniorNotes.jsx";
import SeniorLayout from "./Layouts/SeniorLayout.jsx";
import ProblemSolvingPage from "./pages/ProblemSolving.jsx";
import ShareProject from "./pages/SeniorExp.jsx";
import PostProblemPage from "./pages/SeniorProblem.jsx";
import Projects from "./pages/Projects.jsx";
import AttendanceTracker from "./pages/LeaveTracker.jsx";

function App() {
  return (
      <Routes>
            <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<LandingPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
        </Route>
        <Route path="senior" element={<SeniorLayout />} >
          <Route index element={<SeniorLanding />} />
          <Route path="resources" element={<SeniorUploadPage />} />
          <Route path="project" element={<ShareProject/>} />
          <Route path="problemsolving" element={<PostProblemPage/>} />
        </Route>
        <Route path="student" element={<StudentLayout />}>
            <Route index element={<Student />}/>
            <Route path="resources" element={<Resources />} />
            <Route path="markingsystem" element={<AnnaUniversityMarkingSystem />} />
            <Route path="guide" element={<Scholarship/>} />
            <Route path="problemsolving" element={<ProblemSolvingPage />} />
            <Route path="projects" element={<Projects/>} />
            <Route path="leavetracker" element={<AttendanceTracker/>} />
        </Route>
      </Routes>
  );
}

export default App;