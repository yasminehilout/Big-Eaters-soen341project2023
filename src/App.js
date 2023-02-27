import "./App.css";
import { Auth } from "./components/auth";
import { Browsing  } from "./components/browsing";
import { UploadFile } from "./components/uploadFile";


function App() {
  return (
    <div className="App">
            <Auth />

            <Browsing />
    </div>
  );
}

export default App;
