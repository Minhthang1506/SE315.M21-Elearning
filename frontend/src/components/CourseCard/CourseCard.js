import { Rate } from "antd";
import React from "react";
import { Link } from "react-router-dom";
// custom
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//
const CourseCard = ({ course }) => {
    return (
        <div>
            {/* <Card
                style={{ width: 250,marginRight:'10px' }}
                 cover={<img style = {{height : '150px',objectFit : 'cover'}} alt="example" src={course.image} />} 
                >
                <h3>
                    <Link to = {`/courses/${course._id}`}>
                    {course.name}
                    </Link>
                </h3>
                <h4>{course.user.name}</h4>
                <h5>${course.price}</h5>
                <div className = 'rating'>
                <Rate disabled  width = '2' allowHalf value={course.rating} />
                </div>
            </Card> */}
            <Card className="m-2">
                <Card.Img style={{ height: '200px',objectFit : 'cover'}} variant="top" src={course.image} />

                <Card.Body>
                    <Card.Title className="text-truncate">{course.name}</Card.Title>
                    <h6 className="text-truncate">{course.user.name}</h6>
                    <h6>${course.price}</h6>
                    <Link to={`/courses/${course._id}`}>
                        <Button className="w-100" variant="primary">
                            Đăng ký
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CourseCard;
