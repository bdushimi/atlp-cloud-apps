import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div className="text">
                <h1>Welcome to Educative!</h1>
                <h4>Best Place to Learn Stuff</h4>
            </div>
            <div className="row buttons">
                <div className="text-center">
                    <Link to="/loadAllCourses" className="btn btn-primary btn-md">Load the Courses</Link>
                    <Link to="/fetchAllCourses" className="btn btn-danger btn-md">Fetch the Courses</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
