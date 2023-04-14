import "./App.css";
import { useEffect } from 'react';
import { Navbar } from "./components/navbar";
import { Browsing } from "./components/browsing";
import { auth, db } from "./config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch } from 'react-redux'
import { setRole } from "./features/counter/profileSlice";
//import { EmployerPage } from "./components/employerPage";
//import { UploadFile } from "./components/uploadFile";

/**
 * The App function sets the title of the document and initiates Redux based on the user's
 * authentication status.
 * @returns The App component is being returned, which contains a Navbar and Browsing component.
 */
function App() {

  useEffect(() => {
    document.title = "BigEaters Intern Service"; // set the new title
  }, []);

 const dispatch = useDispatch();

 // Initiate redux onload of page if user is signed in
  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const docRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          if(docSnap.data().role !== "null") {
            dispatch(setRole({
              role: docSnap.data().role
            }))
          } else {
            dispatch(setRole({
              role: null
            }))
          }
        }
        else{
          dispatch(setRole({
            role: null
          }))
        }
      } else {
        dispatch(setRole({
          role: null
        }))
      }
    })
  }, [dispatch])

  return (
    <div className="App">
      <Navbar />
      <Browsing />
    </div>
    );
}

export default App;
