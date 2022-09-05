// Add your imports here
import { Container } from "react-bootstrap";
import Course from "./Course";

const Courses = ({courses_data, loaded_from_db, search_string}) => {
    const checkCondition = (elem) => {
        return elem.toLowerCase().includes(search_string.toLowerCase());
    }

    return courses_data.length > 0 ? (
        <Container> 
        {
            courses_data.map((course, index) => {
                if (checkCondition(course.title) || checkCondition(course.author)) {
                    return (
                        <div key={index} className="border border-light mt-1">
                            <Course course={course}></Course>
                        </div>
                    );
                }
                else return <div key={index}>No Courses Found against your Search</div>
            })
        }
        </Container>
    ) : (
        loaded_from_db ? (
            <div>No courses found!</div>
        ) : (
            <div>Loading courses....</div>
        )
    )
}

export default Courses;