import "./App.css";
// added
import { useEffect, useState } from 'react';
// end
import { Navbar } from "./components/navbar";
import { Browsing  } from "./components/browsing";
//import { EmployerPage } from "./components/employerPage";



//import { UploadFile } from "./components/uploadFile";

function App() {

  useEffect(() => {
    document.title = "BigEaters Intern Service"; // set the new title
  }, []);


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
