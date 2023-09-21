import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { backendUrl } from "../../settings";
import CardHeader from "react-bootstrap/esm/CardHeader";

export const ListCard = (movieList) => {
  //   console.log(movieList);
  const login = JSON.parse(window.localStorage.getItem("login"));
  const [cookies] = useCookies();
  const [disable, setDisable] = useState(false);
  const handleFav = () => {
    // Like list, add it to my lists
    if (login) {
      setDisable(true);
      const request = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
        },
      };
      fetch(
        `${backendUrl}/user/liked/lists/${movieList.info.id}`,
        request
      ).then((data) => {
        window.location.reload(false);
        return data.json();
      });

      window.localStorage.setItem("login", true);
    } else {
      alert("Please login first!");
    }
  };
  return (
    <Card className="text-center mx-2 text-bg-dark border-light">
      <CardHeader>
        <Button
          //   variant="outline-primary"
          disabled={disable}
          onClick={handleFav}
        >
          +
        </Button>
      </CardHeader>
      <Card.Body>
        <Link
          to={"/list/".concat(movieList.info.id)}
          className="text-bg-dark text-decoration-none"
        >
          <script src="holder.js"></script>
          <Card.Title>{movieList.info.name}</Card.Title>

          <div>
            Likes:{movieList.info.liked}
            <br></br>
            Description:{movieList.info.description}
          </div>
          <Link to={login ? "/list/".concat(movieList.info.id) : "/home/"}>
            {/* <stack> */}
            {
              // TODO cover for list
              /* <Card.Img
              variant="top"
              width="200"
              heigh="300"
              src={movieList.info.movies[0].cover}
              /> */
            }
            {/* </stack> */}
          </Link>
          <hr />
          <div>Created by {movieList.info.creator} </div>
        </Link>
      </Card.Body>
    </Card>
  );
  // TODO cover for list and design api for get list details
  //   if (movieList.info.movies.length === 0) {
  //     return (
  //       <Card style={{ width: "15rem" }}>
  //         <Card.Body>
  //           <script src="holder.js"></script>
  //           <Card.Title style={{ height: "2.2rem", textAlign: "left" }}>
  //             <Link
  //               style={{ textDecoration: "none", color: "black" }}
  //               to={login ? "/list/".concat(movieList.info.id) : "/home/"}
  //             >
  //               {movieList.info.name}
  //             </Link>
  //             <Button
  //               style={{ position: "relative", float: "right" }}
  //               variant="outline-primary"
  //               width="80"
  //               disabled={disable}
  //               onClick={handleFav}
  //             >
  //               +
  //             </Button>
  //           </Card.Title>

  //           <div>
  //             Likes:{movieList.info.liked}
  //             <br></br>
  //             Description:{movieList.info.description}
  //           </div>
  //           <Link
  //             to={login ? "/list/".concat(movieList.info.id) : "/home/"}
  //           ></Link>
  //           <hr />
  //           <div>Created by {movieList.info.owner_info.username} </div>
  //         </Card.Body>
  //       </Card>
  //     );
  //   } else {
  //     return (
  //       <Card style={{ width: "15rem" }}>
  //         <Card.Body>
  //           <script src="holder.js"></script>
  //           <Card.Title style={{ height: "2.2rem", textAlign: "left" }}>
  //             <Link
  //               style={{ textDecoration: "none", color: "black" }}
  //               to={login ? "/list/".concat(movieList.info.id) : "/home/"}
  //             >
  //               {movieList.info.name}
  //             </Link>
  //             <Button
  //               style={{ position: "relative", float: "right" }}
  //               variant="outline-primary"
  //               width="80"
  //               disabled={disable}
  //               onClick={handleFav}
  //             >
  //               +
  //             </Button>
  //           </Card.Title>

  //           <div>
  //             Likes:{movieList.info.liked}
  //             <br></br>
  //             Description:{movieList.info.description}
  //           </div>
  //           <Link to={login ? "/list/".concat(movieList.info.id) : "/home/"}>
  //             <stack>
  //               <Card.Img
  //                 variant="top"
  //                 width="200"
  //                 heigh="300"
  //                 src={movieList.info.movies[0].cover}
  //               />
  //             </stack>
  //           </Link>
  //           <hr />
  //           <div>Created by {movieList.info.owner_info.username} </div>
  //         </Card.Body>
  //       </Card>
  //     );
  //   }
};
