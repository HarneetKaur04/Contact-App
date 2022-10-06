import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import Home from "./components/home"
import LikedContact from "./components/LikedContact";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorites' element={<LikedContact/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
