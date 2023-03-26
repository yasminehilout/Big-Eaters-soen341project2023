import "./App.css";
import { Navbar } from "./components/navbar";
import { Browsing } from "./components/browsing";
import { auth, db } from "./config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { setRole } from "./features/counter/profileSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const docRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
        dispatch(setRole({
          role: docSnap.data().role
        }))}
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
