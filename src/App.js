import "./App.css";
import { Navbar } from "./components/navbar";
import { Browsing  } from "./components/browsing";
import { UploadFile } from "./components/uploadFile";

import { StudentProfile } from "./components/student-profile";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Browsing />
      <StudentProfile/>
    </div>
    
  );
}

export default App;
