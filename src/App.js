import "./App.css";
// added
import { useState } from 'react';
// end
import { Navbar } from "./components/navbar";
import { Browsing  } from "./components/browsing";
//import { EmployerPage } from "./components/employerPage";



//import { UploadFile } from "./components/uploadFile";

function App() {
  // default page
  // set to students as non-users can also apply
  // change it to another user "browsing" (needs more development) 
  // if conflicts arises with "student"
  const [userView, setUserView] = useState("student");

 // const displayView = () => {
   // if (userView === "student") return <Browsing/>;
    // if set to employer page they will see employer page
   // if (userView === "employer") return <EmployerPage/>;
 // }

    return (
      <div className = "App">
        {console.log(userView)}
        <Navbar setView = {setUserView} />
        <Browsing test = {userView}/>
        {/* {displayView()} */}
      </div>
      

    );
}

export default App;
