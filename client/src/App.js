import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import Home from "./components/home"

import Header from "./components/header";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
