//import { Card } from "antd";
import React, { useEffect, useRef } from "react";
import { Empty } from "antd";
import { Helmet } from "react-helmet";
import axios from "axios";

import { Link } from "react-router-dom";
import Slider from "react-slick";
//import { Tabs } from "antd";
import { Skeleton } from "antd";
import "./Home.css";
import CourseCard from "../../components/CourseCard/CourseCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
    dispatchLogin,
    dispatchGetUser,
    fetchUser,
} from "../../redux/actions/authAction";
import {
    Listcoursesbypobularity,
    ListcoursesbyTopic,
} from "../../redux/actions/courseActions";
import Error from "../../components/utils/Error";

// custom
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
//

const Home = () => {
    const dispatch = useDispatch();
    const ListCoursesReducer = useSelector((state) => state.ListCoursesReducer);
    const { loading, courses, error } = ListCoursesReducer;
    const ListCoursesbyPobularityReducer = useSelector(
        (state) => state.ListCoursesbyPobularityReducer
    );
    const {
        loading: loadingpobular,
        courses: coursespobular,
        error: errorpobular,
    } = ListCoursesbyPobularityReducer;
    const menuref = useRef(null);
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);
    const popularref = useRef(null);
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    swipeToSlide: true,
                    infinite: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    swipeToSlide: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    swipeToSlide: true,
                    arrows: false,
                },
            },
        ],
    };
    const executeScroll = () => menuref.current.scrollIntoView();

    //const { TabPane } = Tabs;
    useEffect(() => {
        const getToken = async () => {
            // make post request : hey db get me some data and return it to me
            const res = await axios.post("/user/refresh_token", null);
            dispatch({
                type: "GET_TOKEN",
                payload: res.data.access_token,
            });
        };
        getToken();
        if (token) {
            const getUser = () => {
                dispatch(dispatchLogin());
                //Get user infor
                return fetchUser(token).then((res) => {
                    dispatch(dispatchGetUser(res));
                });
            };
            getUser();
        }
        dispatch(ListcoursesbyTopic("Development"));
        dispatch(Listcoursesbypobularity());
    }, [auth.isLogged, token, dispatch]);
    const changetopic = (key) => {
        switch (key) {
            case "1":
                dispatch(ListcoursesbyTopic("Development"));
                break;
            case "2":
                dispatch(ListcoursesbyTopic("marketing"));
                console.log("case 2");
                break;
            case "3":
                dispatch(ListcoursesbyTopic("Self-dev"));
                console.log("case 3");
                break;
            case "4":
                dispatch(ListcoursesbyTopic("photography"));
                console.log("case 4");
                break;
            case "5":
                dispatch(ListcoursesbyTopic("music"));
                console.log("case 5");
                break;
            case "6":
                dispatch(ListcoursesbyTopic("design"));
                console.log("case 6");
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Helmet>
                <title>EDUSPACE</title>
            </Helmet>
            <Container fluid className="p-4">
                <Container fluid className="my-4" ref={popularref}>
                    <h2>Khóa học phổ biến </h2>
                    {loadingpobular ? (
                        <Skeleton />
                    ) : errorpobular ? (
                        <Error error={errorpobular} />
                    ) : coursespobular.length === 0 ? (
                        <Empty />
                    ) : (
                        <Slider {...settings}>
                            {coursespobular.map((course, index) => (
                                <>
                                    <CourseCard
                                        key={course._id}
                                        data-index={index}
                                        course={course}
                                    />
                                </>
                            ))}
                        </Slider>
                    )}
                </Container>

                <Container fluid ref={menuref} className="my-4 border">
                    <h2 className="mt-2">Gợi ý: </h2>

                    {/* <Tabs defaultActiveKey="1" onTabClick={changetopic}>
          <TabPane tab="Devlopement" key="1">
            <div className="Tab_Content">
              <h2>Become a Devloper</h2>

              <div id="paragraphbtn">
                <p>
                  As Steve Jobs once said, “I think everybody in this country
                  should learn how to program a computer, because it teaches you
                  how to think. I view computer science as a liberal art.”
                  <br />
                  In other words, learning to code won’t just give you technical
                  knowledge—it’ll also give you a new way to approach your work.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Development"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Marekting" key="2">
            <div className="Tab_Content">
              <h2>Become a Markter</h2>

              <div id="paragraphbtn">
                <p>
                  Marketing is more than a concentration within a business
                  major. More accurately, it describes a collection of skills
                  that are useful in any career. As a professional discipline,
                  marketing is a vital function of any business’ operation. It
                  explores customer perceptions and journeys as primary sources
                  of profit. It also utilizes various data to make smart and
                  insightful business decisions.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Marketing"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Self Dev" key="3">
            <div className="Tab_Content">
              <h2>Improve your soft skills</h2>
              <div id="paragraphbtn">
                <p>
                  Personal development is a lifelong process. It is a way for
                  people to assess their skills and qualities, consider their
                  aims in life and set goals in order to realise and maximise
                  their potential.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Self-Dev"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Photography" key="4">
            <div className="Tab_Content">
              <h2>Become a Photographer</h2>
              <div id="paragraphbtn">
                <p>
                  Learning about light, exposure, color, tone, composition and
                  timing will help you produce more creative, more interesting,
                  more noticeable photographs. ... Learning to appreciate
                  different types of light and when some light is better for
                  making photos than others, will help you create more
                  outstanding photographs.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Photography"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Music" key="5">
            <div className="Tab_Content">
              <h2>Become a Musician</h2>

              <div id="paragraphbtn">
                <p>
                  Learning a musical instrument not only sustains and feeds the
                  brain, but it also improves so many other cognitive and
                  physical aspects of the human body. It's been widely studied
                  and proven that learning a musical instrument improves memory;
                  it not only improves your cognitive memory but also muscle
                  memory as well.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Music"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Design" key="6">
            <div className="Tab_Content">
              <h2>Become a Designer</h2>
              <div id="paragraphbtn">
                <p>
                  Millions of UK workers are at risk of being replaced by robots
                  within 15 years, a study claims. It's depressing news for
                  many, but if you learn something that machines could never do,
                  then you'll be future-proofing your career for many decades to
                  come. Graphic design is creative and requires human-led
                  intelligence and ideas to respond to trends, tastes, and what
                  has already been before. It will never be something a robot
                  can mimic. Sure, the technology to create will continue to
                  make our lives easier as designers, but they'll never replace
                  us. Never.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Design"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
        </Tabs> */}
                    <Tabs
                        defaultActiveKey="1"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        onSelect={changetopic}
                    >
                        <Tab eventKey="1" title="Lập trình" className="mx-2">
                            <Container fluid>
                                {loading ? (
                                    <Skeleton />
                                ) : error ? (
                                    <Error error={error} />
                                ) : courses.length === 0 ? (
                                    <Empty />
                                ) : (
                                    <Slider {...settings}>
                                        {courses.map((course, index) => (
                                            <>
                                                <CourseCard
                                                    key={course._id}
                                                    data-index={index}
                                                    course={course}
                                                />
                                            </>
                                        ))}
                                    </Slider>
                                )}
                            </Container>
                            <Row className="justify-content-center">
                                <Col md={2} xd={12}>
                                    <Link
                                        style={{
                                            textDecoration: "none !important",
                                        }}
                                        to="/coursesfilter/Development"
                                    >
                                        <Button
                                            variant="success"
                                            className="w-100 my-2"
                                        >
                                            Tất cả
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Tab>

                        <Tab eventKey="2" title="Marekting">
                            <h1> dfadfsdà</h1>
                        </Tab>
                        <Tab eventKey="3" title="Kỹ năng">
                            <h1> dfadfsdà</h1>
                        </Tab>
                        <Tab eventKey="4" title="Ảnh">
                            <h1> dfadfsdà</h1>
                        </Tab>
                        <Tab eventKey="5" title="Âm nhạc">
                            <h1> dfadfsdà</h1>
                        </Tab>
                        <Tab eventKey="6" title="Thiết kế">
                            <h1> dfadfsdà</h1>
                        </Tab>
                    </Tabs>
                </Container>
                {/* <section className="Courses_Popular" ref={pobularref}>
                    <h2>Pobular Courses </h2>
                    <div className="coursecards">
                        {loadingpobular ? (
                            <Skeleton />
                        ) : errorpobular ? (
                            <Error error={errorpobular} />
                        ) : coursespobular.length === 0 ? (
                            <Empty />
                        ) : (
                            <Slider {...settings}>
                                {coursespobular.map((course, index) => (
                                    <>
                                        <CourseCard
                                            key={course._id}
                                            data-index={index}
                                            course={course}
                                        />
                                    </>
                                ))}
                            </Slider>
                        )}
                    </div>
                </section> */}
                <Container fluid className="my-4">
                    <h2>Tất cả danh mục</h2>
                    <Row xs={2} md={4} className="g-4">
                        <CategoryCard
                            title="Development"
                            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        />
                        <CategoryCard
                            title="Design"
                            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                        />
                        <CategoryCard
                            title="Marketing"
                            image="https://images.unsplash.com/flagged/photo-1556514767-5c270b96a005?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80"
                        />
                        <CategoryCard
                            title="Music"
                            image="https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        />
                        <CategoryCard
                            title="Photography"
                            image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        />
                        <CategoryCard
                            title="Self-Dev"
                            image="https://images.unsplash.com/photo-1571425046056-cfc17c664e57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        />
                        <CategoryCard
                            title="Business"
                            image="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80"
                        />
                        <CategoryCard
                            title="Education"
                            image="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        />
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

export default Home;
