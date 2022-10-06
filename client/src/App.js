import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import Home from "./components/home"
import ContactDetails from "./components/ContactDetails";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Details' element={<ContactDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
