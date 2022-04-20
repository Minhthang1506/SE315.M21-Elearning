import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const textTruncateFunction = (text, numberOfWord) => {
    var result = text.split(" ");
    var lengthOfText = result.length;
    if (lengthOfText > numberOfWord) {
        result = result.splice(0, numberOfWord);
        return result.join(" ") + "...";
    } else return result.join(" ");
};
var exampleText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,";

const CategoryCard = ({ image, title }) => {
    return (
        <div>
            <Link to={`coursesfilter/${title}`}>
                <Card>
                    <Card.Img
                        style={{ height: "200px", objectFit: "cover" }}
                        className="rounded-0"
                        src={image}
                    ></Card.Img>
                    <Card.Body className="">
                        <h5 className="text-center text-truncate m-auto">
                            {title}
                        </h5>
                        <h6 className="m-2">
                            <small>
                                {textTruncateFunction(exampleText, 20)}
                            </small>
                        </h6>
                    </Card.Body>
                </Card>
                {/* <div className="limiter_img">
          <img src={image} alt="" />
        </div>
        <h2>{title}</h2>{" "} */}
            </Link>
        </div>
    );
};

export default CategoryCard;
