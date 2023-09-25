import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { backendUrl } from "../settings";

import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { MovieCard } from "../Home/body/MovieCardGroup";
import "./Search.css";
// import { checkbox } from "./body/checkboxes";
export function ResultCardMovie(item) {
  const login = JSON.parse(window.localStorage.getItem("login"));

  const handleNotLogin = () => {
    if (!login) {
      alert("Pleas Log In or Sign Up First!");
    }
  };
  const handleAddToList = (mv_id) => {
    const request = {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    fetch(`${backendUrl}/user/lists/movies/` + mv_id, request);
  };

  if (item.valueProps.cover === "none") {
    item.valueProps.cover =
      "//st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg";
  }
  return (
    <Container className="mb-2 text-bg-dark">
      <script src="holder.js"></script>

      <Row>
        <Col xs="2">
          <Link className="movie_link" to={"/movie/" + item.valueProps.id}>
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
            to={login ? "/movie/" + item.valueProps.id : "/advanced_search/"}
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
    </Container>
  );
}

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  const [searchJSON, setSearchJSON] = useState("");

  const handleSearch = useCallback(() => {
    const request = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: window.localStorage.getItem("searchJSON"),
    };

    fetch(`${backendUrl}/search_movie`, request)
      .then((response) => {
        return response.json();
      })
      .then(
        (response) => {
          if (!response.data) {
            console.log("no results");
            setSearchResults(["No results!"]);
          } else {
            setSearchResults(response.data);
          }
        },
        (ex) => {}
      );
  }, []);

  useEffect(() => {
    window.localStorage.setItem("searchJSON", searchJSON);
  }, [searchJSON]);

  const updateSearchJSON = useCallback(() => {
    setSearchJSON(
      JSON.stringify({
        language: language,
        type: type,
        keyword: keyword,
        searchType: "Movie",
      })
    );
  }, [keyword, language, type]);

  useEffect(() => {
    updateSearchJSON();
  }, [language, type, keyword, updateSearchJSON]);

  const handleChangeLanguage = (languageName) => {
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
        <Stack className="text-bg-dark" gap={2}>
          <Form className="d-flex mb-2">
            <input
              type="text"
              className="form-control"
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
            <Button variant="light" onClick={handleSearch}>
              Search
            </Button>
          </Form>
          <Stack key="search-box-stack" className="mb-3">
            <div>
              Language:
              {/* TODO allow multiple genre or language selection */}
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
            </div>
            <div>
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
            </div>
          </Stack>
          {/* Results Card */}
          <Stack className="text-bg-dark" gap={3}>
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
              {searchResults.map((item, index) => {
                return (
                  <Col>
                    <MovieCard movieInformation={item}></MovieCard>
                  </Col>
                );
              })}
            </Row>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Search;
