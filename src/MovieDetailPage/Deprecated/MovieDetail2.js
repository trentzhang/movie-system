import React, { useState } from "react";
import Header from "../../Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Stack,
  Button,
  Container,
  Card,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import "holderjs";

import RatingsComponent from "../LikeButton/LikeButton";
import ListCard from "../../List/ListCard";
import "./MovieDetail.sass";
// import { withRouter } from "react-router-dom";
import { coverURL } from "../../Misc/functions";
import { Routes, Route, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // var/objs to use
      movie_id: "",
      cover: "",
      description: "",
      language: "",
      production: "",
      release_year: "",
      runtime: "",
      title: "",
      type: "",
      comments: [],
      liked_users: [],
      //   display: "",
      //   people_id: [],
      //   director: "",
      //   writer: "",
      //   rating: 0,
      //   avg_rating: 0,
      lists: [],
    };
    this.changeLike = this.changeLike.bind(this);
    // this.goBack = this.goBack.bind(this);
  }
  componentDidMount(e) {
    console.log(this.props);
    fetch("${backendUrl}/movies/" + this.props.params.movie_Id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        this.setState({
          movie_id: res.movie_id,
          title: res.title,
          description: res.description,
          release_year: res.release_year,
          runtime: res.runtime,
          type: res.type,
          cover: coverURL(res.cover),
          production: res.production,
          language: res.language,
          comments: res.comments, // list of dicts
          liked_users: res.liked_users, // list of dicts
        });

        // console.log(res + "info");
        // console.log(this.state);
      })
      .catch((e) => alert(e));
    //   .then(() => {
    //     if (this.state.people_id)
    //       this.state.people_id.map((item, index) => {
    //         item = item.split(":");
    //         console.log(item);
    //         if (item[1] === "director") {
    //           const request = {
    //             method: "POST",
    //             mode: "cors",
    //             credentials: "omit",
    //             headers: { "Content-type": "application/json" },
    //             body: JSON.stringify({ peopleid: item[0] }),
    //           };
    //           fetch("${backendUrl}/get_all_people", request)
    //             .then((res) => res.json())
    //             .then((res) => {
    //               // this.setState({ movie_id: res.movie_id })
    //               this.setState({
    //                 director: res.name,
    //               });
    //               console.log(res + "hhhhhhh");
    //               console.log(this.state);
    //             });
    //         } else if (item[1] === "writer") {
    //           const request = {
    //             method: "POST",
    //             mode: "cors",
    //             credentials: "omit",
    //             headers: { "Content-type": "application/json" },
    //             body: JSON.stringify({ peopleid: item[0] }),
    //           };
    //           fetch("${backendUrl}/get_all_people", request)
    //             .then((res) => res.json())
    //             .then((res) => {
    //               // this.setState({ movie_id: res.movie_id })
    //               this.setState({
    //                 writer: res.name,
    //               });
    //               console.log(res + "hhhhhhh");
    //               console.log(this.state);
    //             });
    //         }
    //         return null;
    //       });
    //   });
    //   .then(() => {
    //     if (JSON.parse(window.localStorage.getItem("login")).email) {
    //       console.log("hgfdg", request);
    //       fetch("${backendUrl}/randomly_generate_list", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           user_id: JSON.parse(window.localStorage.getItem("login")).email,
    //         }),
    //       })
    //         .then((res) => res.json())
    //         .then((res) => {
    //           // this.setState({ movie_id: res.movie_id })
    //           this.setState({
    //             list: res,
    //           });
    //           console.log(res + "hhhhhhh");
    //           console.log(this.state);
    //         });
    //     } else {
    //       console.log("hgfdg", request);
    //       fetch("${backendUrl}/randomly_generate_list", {
    //         method: "POST",
    //         body: JSON.stringify({ user_id: "" }),
    //       })
    //         .then((res) => res.json())
    //         .then((res) => {
    //           // this.setState({ movie_id: res.movie_id })
    //           this.setState({
    //             list: res,
    //           });
    //           console.log(res + "hhhhhhh");
    //           console.log(this.state);
    //         });
    //     }
    //   });

    //   change to post get_all_list
    fetch("${backendUrl}/lists/get_all_lists", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.lists[0]);
        this.setState({ lists: res.lists });
      });
  }

  // function to trigger when like status changed
  changeLike(liked) {
    this.setState({
      liked: liked,
    });
    if (JSON.parse(window.localStorage.getItem("login"))) {
      //   const request = {
      //     method: "POST",
      //     mode: "cors",
      //     credentials: "omit",
      //     headers: { "Content-type": "application/json" },
      //     body: JSON.stringify({
      //       movie_Id: this.state.movie_id,
      //       userid: JSON.parse(window.localStorage.getItem("login")).email,
      //       liked: liked,
      //     }),
      //   };
      //   //   console.log(request);
      //   fetch("${backendUrl}/rating_post", request)
      //     .then((data) => {
      //       console.log("parsed json", data);
      //       return data.json();
      //     })
      //     .then(
      //       (data) => {
      //         console.log("parsed json", data);
      //         if (data.whether_lucky) {
      //           alert("You are the lucky people! Your rating will be doubled.");
      //         }
      //       },
      //       (ex) => {
      //         console.log("parsing failed", ex);
      //       }
      //     );
    } else {
      alert("Please login first!");
    }
  }

  render() {
    return (
      <Stack gap={3}>
        <Header />
        <Container className="mb-2">
          <Card>
            <script src="holder.js"></script>
            <Card.Body>
              <Button
                variant="secondary"
                className="back-button"
                onClick={this.props.history.goBack}
              >
                Back
              </Button>
              <Row>
                <Col xs="3">
                  <Image
                    src={this.state.cover}
                    className="mx-auto"
                    width="200"
                    heigh="300"
                  />
                </Col>
                <Col>
                  <h2>{this.state.title}</h2>
                  <br />
                  <div>
                    <b>Director:</b> {this.state.director}
                  </div>
                  <div>
                    <b>Writer:</b> {this.state.writer}
                  </div>
                  <div>
                    <b>Type:</b> {this.state.type}
                  </div>
                  <div>
                    <b>Release year:</b> {this.state.release_year}
                  </div>
                  <div>
                    <b>Run Time:</b> {this.state.runtime} min
                  </div>
                  <div>
                    <b>Production:</b> {this.state.production}
                  </div>
                  <div>
                    <b>Language:</b> {this.state.language}
                  </div>
                  <div>
                    <RatingsComponent
                      liked={this.state.liked}
                      clickFunc={this.changeLike}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Body>
              <b>Description:</b> {this.state.description}
            </Card.Body>
            <Card.Body>
              <b>They also liked this movie:</b>
            </Card.Body>
            <Card.Body>
              <b>Lists you may interested</b>
              <Stack direction="horizontal" gap={3}>
                {this.state.lists.map((item, _) => {
                  if (JSON.parse(window.localStorage.getItem("login"))) {
                    return (
                      <ListCard
                        valueProps={item}
                        user_id={
                          JSON.parse(window.localStorage.getItem("login")).email
                        }
                      />
                    );
                  } else {
                    return <ListCard valueProps={item} user_id="" />;
                  }
                })}
              </Stack>
            </Card.Body>
            <Card.Body>
              <b>User review</b>
              {this.state.comments.map((value, _) => {
                // console.log(value.user);
                return (
                  <div>
                    {value.user}:{value.comment}
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Container>
      </Stack>
    );
  }
}
export default MovieDetail;
