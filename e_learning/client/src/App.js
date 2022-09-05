import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './Components/Home';
import Loader from './Components/Loader';
import BaseComponent from './Components/BaseComponent';
import './App.css';

function App() {
  const [api, setAPI] = useState("");

  // const fetchAPI = async () => {
  //   let Base_URL = "localhost/"; // Copy your URL link here
  //   Base_URL = Base_URL.replace(/\/$/, "");
  //   const Final_URL = "http://" + Base_URL + ":8080";
  //   setAPI(Final_URL);
  // }

  const fetchAPI = async () => {
    const response = await fetch('./config.txt');
    const text = await response.text();
    setAPI(text);
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loadAllCourses" element={<Loader api={api} />} />
        <Route path="/fetchAllCourses" element={<BaseComponent api={api} />} />
      </Routes>
    </Router>

  );
}

export default App;
