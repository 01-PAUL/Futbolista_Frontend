import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFutbolistas from "./futbolistas/AddFutbolistas";
import EditFutbolistas from "./futbolistas/EditFutbolistas";
import ViewFutbolistas from "./futbolistas/ViewFutbolistas";

function App() {
  return (
    <div className="App">
        <Router>
        <Navbar />
          
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/addfutbolistas" element={<AddFutbolistas />} />
          <Route exact path="/editfutbolista/:id" element={<EditFutbolistas />} />
          <Route exact path="/viewfutbolista/:id" element={<ViewFutbolistas />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
