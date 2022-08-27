import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

const Loader = ({ api }) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(null);

    const loadData = async () => {
        try {
            const endpoint = api + '/loadAllCourses';
            const res = await axios.get(endpoint);
            console.log(res);
            alert("Data has been loaded. You will now be directed to the Courses page");
            setLoaded(res);
        }
        catch (error) {
            console.log("Error : " + error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container className="home-loader">
            {loaded && (
                navigate('/fetchAllCourses')
            )}
        </Container>
    );
}

export default Loader;