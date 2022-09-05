import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './Components/Home';
import Loader from './Components/Loader';
import BaseComponent from './Components/BaseComponent';
import './App.css';

const App = () => {
    const [api, setAPI] = useState("");

    const fetchAPI = async () => {
        let Base_URL = "5lm279vj56q48.educative.run/"; // Copy your URL link here
        Base_URL = Base_URL.replace(/\/$/, "");
        const Final_URL = "https://" + Base_URL + ":3000";
        setAPI(Final_URL);
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
    )
}

export default App;