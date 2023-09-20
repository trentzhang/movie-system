import React, { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Form,
  FormControl,
  Button,
  Container,
  Card,
  Image,
  Row,
  Col,
} from "react-bootstrap";

import "./Search.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function ResultCardMovie(item) {
  const login = JSON.parse(window.localStorage.getItem("login"));
  const [cookies] = useCookies();

  const handleNotLogin = () => {
    if (!login) {
      alert("Pleas Log In or Sign Up First!");
    }
  };
  const handleAddToList = (mv_id) => {
    const request = {
      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },
    };

    fetch("${backendUrl}/user/lists/movies/" + mv_id, request);
  };

  if (item.valueProps.cover === "none") {
    item.valueProps.cover =
      "//st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg";
  }
  return (
    <Container className="mb-2">
      <Card>
        <script src="holder.js"></script>
        <Card.Body onClick={handleNotLogin}>
          <Row>
            <Col xs="2">
              <Link
                className="movie_link"
                onClick={handleNotLogin}
                to={
                  login ? "/movie/" + item.valueProps.id : "/advanced_search/"
                }
              >
                <Image
                  src={item.valueProps.cover}
                  height="150"
                  width="100"
                  className="mx-auto"
                />
              </Link>
            </Col>
            <Col xs="9">
              <Link
                className="movie_link"
                onClick={handleNotLogin}
                to={
                  login ? "/movie/" + item.valueProps.id : "/advanced_search/"
                }
              >
                <h3>{item.valueProps.title}</h3>
              </Link>
              <div>Runtime: {item.valueProps.runtime} min</div>
              <div>Type: {item.valueProps.type}</div>
            </Col>
            <Col className="m-auto">
              <Button
                variant="outline-primary"
                className="float_right"
                onClick={() => {
                  handleNotLogin();
                  handleAddToList(item.valueProps.id);
                }}
              >
                +
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [banners, setBanners] = useState([]);
  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");
  const lan_list = [
    "English",
    "Spanish",
    "French",
    "Chinese",
    "Japanese",
    "Korean",
  ];
  const type_list = [
    "Documentary",
    "Comedy",
    "Drama",
    "Fantasy",
    "Thriller",
    "Action",
    "Romance",
    "Sci_Fi",
  ];

  const mapToObj = (m) => {
    return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  };

  // console.log("start0");

  const [searchJSON, setSearchJSON] = useState("");

  const handleSearch = useCallback(() => {
    const request = {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: window.localStorage.getItem("searchJSON"),
    };

    // console.log(request.body);

    fetch("${backendUrl}/user/search_movie", request)
      .then((response) => {
        // console.log("parsed json", response);
        return response.json();
      })
      .then(
        (response) => {
          // console.log(response.data);
          if (!response.data) {
            console.log("no results");
            setBanners(["No results!"]);
          } else {
            setBanners(response.data);
          }
          // console.log("banner", banners);
        },
        (ex) => {
          // console.log("parsing failed", ex);
        }
      );
  }, [banners, keyword]);

  useEffect(() => {
    window.localStorage.setItem("searchJSON", searchJSON);
  }, [searchJSON]);

  const updateSearchJSON = useCallback(() => {
    // console.log("updating searchJSON");
    // console.log("-language:", language);
    // console.log("-type:", type);
    setSearchJSON(
      JSON.stringify({
        language: language,
        type: type,
        keyword: keyword,
        isMovie: "Movie",
      })
    );
  }, [keyword, language, type]);

  useEffect(() => {
    updateSearchJSON();
  }, [language, type, keyword, updateSearchJSON]);

  const handleChangeLanguage = (languageName) => {
    // console.log("ready to update searchJSON:", searchJSON);
    // console.log("language:", language);
    if (language === languageName) {
      setLanguage("");
    } else {
      setLanguage(languageName);
    }
    updateSearchJSON();
  };

  const handleChangeType = (typeName) => {
    if (type === typeName) {
      setType("");
    } else {
      setType(typeName);
    }
    updateSearchJSON();
  };

  return (
    <Stack gap={3}>
      <Header />

      <Container>
        <Card className="mb-2">
          <Card.Body>
            <Form className="d-flex mb-2">
              <input
                type="text"
                class="form-control"
                style={{ display: "none" }}
              ></input>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                onChange={(e) => {
                  e.preventDefault();
                  console.log(e.target.value);
                  setKeyword(e.target.value);
                }}
                value={keyword}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                {" "}
                Search{" "}
              </Button>
            </Form>
            Language:
            <Container>
              {Array.from(lan_list).map((l) => {
                return (
                  <Form.Check
                    label={l}
                    inline
                    type="checkbox"
                    checked={language === l}
                    onChange={() => handleChangeLanguage(l)}
                  />
                );
              })}
            </Container>
            Genre:
            <Container>
              {Array.from(type_list).map((t) => {
                return (
                  <Form.Check
                    label={t}
                    inline
                    type="checkbox"
                    checked={type === t}
                    onChange={() => handleChangeType(t)}
                  />
                );
              })}
            </Container>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            {banners.map((item, index) => {
              return (
                <ResultCardMovie
                  valueProps={item}
                  user_id={
                    JSON.parse(window.localStorage.getItem("login")).email
                  }
                />
              );
            })}
          </Card.Body>
        </Card>
      </Container>
    </Stack>
  );
};

export default Search;
