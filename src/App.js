import "./App.css";
import { Auth } from "./components/auth";
import { Browsing  } from "./components/browsing";


function App() {
  return (
    <div className="App">
            <Auth />

            <Browsing />
    </div>
  );
}

export default App;
