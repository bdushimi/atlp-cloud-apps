// Add your imports here
import { Row, Col } from "react-bootstrap";
import { Image, Button } from "react-bootstrap";

const Course = ({ course }) => {
    return (
        <Row>
            <Col xs={2} className={"m-2 me-1"}>
                <div>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        src={course.img}
                        alt="Image could not load"
                    ></Image>
                </div>
            </Col>
            <Col xs={6} className={"m-1 mt-2"}>
                <div>
                    <a href={course.url}>{course.title}</a>
                </div>
                <div>{course.author}</div>
                <div className="mt-2">{course.overview}</div>
                <div className={"mt-3"}>{course.free ? "Free" : "Paid"}</div>
                <Button
                    variant="primary"
                    className={"mt-1"}
                    onClick={() => {
                        window.open('https://www.educative.io/', '_blank');
                    }}
                >
                    Visit Website
                </Button>
            </Col>
        </Row>
    );
}

export default Course;