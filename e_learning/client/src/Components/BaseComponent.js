// Add your imports here
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchCourse from "./SearchCourse";
import Courses from "./Courses";
import axios from "axios";

const BaseComponent = ({ api }) => {
    const [state, setState] = useState({
        courses: [],
        search_string: "",
        loaded: false,
    });

    const fetchData = async () => {
        try {
            const endpoint = api + '/fetchAllCourses';
            const res = await axios.get(endpoint); 
            if (res.data.length > 0) {
                setState((prevState) => {
                    return { ...prevState, courses: res.data, loaded: true };
                });
            } 
            else
                setState((prevState) => {
                return { ...prevState, loaded: true };
            });
        } 
        catch (error) {
            console.log("Error : " + error);
            setState((prevState) => {
                return { ...prevState, loaded: true };
            });
        }        
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchStringUpdate = (searchString) => {
        setState((prevState) => {
            return { ...prevState, search_string: searchString };
        });
    };

    return (
        <Container>
            <SearchCourse
                search_string={state.search_string}
                searchStringUpdated={handleSearchStringUpdate}
            />
            <Courses
                courses_data={state.courses}
                loaded_from_db={state.loaded}
                search_string={state.search_string}
            />
        </Container>
    );
}
export default BaseComponent;