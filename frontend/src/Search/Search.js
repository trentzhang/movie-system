import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Stack,
} from "react-bootstrap";
import { backendUrl } from "../settings";
import Header from "../Header/Header";
import { MovieCard } from "../Home/body/MovieCardGroup";

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

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(0);

  const handleSearch = useCallback(async () => {
    try {
      setPage(0);
      const searchCriteria = {
        language: language,
        type: type,
        keyword: keyword,
        searchType: "Movie",
        page: 0,
      };

      const request = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(searchCriteria),
      };
      const response = await fetch(`${backendUrl}/search_movie`, request);
      const data = await response.json();

      if (!data.data) {
        console.log("no results");
        setSearchResults(["No results!"]);
      } else {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [keyword, language, type]);

  const handleChangeLanguage = (languageName) => {
    setLanguage((prevLanguage) =>
      prevLanguage === languageName ? "" : languageName
    );
  };

  const handleChangeType = (typeName) => {
    setType((prevType) => (prevType === typeName ? "" : typeName));
  };

  // Attach the scroll event listener
  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        try {
          const searchCriteria = {
            language: language,
            type: type,
            keyword: keyword,
            searchType: "Movie",
            page: page + 1,
          };

          const request = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(searchCriteria),
          };
          const response = await fetch(`${backendUrl}/search_movie`, request);
          const data = await response.json();

          setPage((prevPage) => prevPage + 1);
          setSearchResults((prevResults) => [
            ...prevResults,
            ...(data.data || []),
          ]);
        } catch (error) {
          console.error("Error fetching additional search results:", error);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

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
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <Button variant="light" onClick={handleSearch}>
              Search
            </Button>
          </Form>
          <Stack key="search-box-stack" className="mb-3">
            <div>
              Language:
              <Container>
                {lan_list.map((l) => (
                  <Form.Check
                    key={l}
                    label={l}
                    inline
                    type="checkbox"
                    checked={language === l}
                    onChange={() => handleChangeLanguage(l)}
                  />
                ))}
              </Container>
            </div>
            <div>
              Genre:
              <Container>
                {type_list.map((t) => (
                  <Form.Check
                    key={t}
                    label={t}
                    inline
                    type="checkbox"
                    checked={type === t}
                    onChange={() => handleChangeType(t)}
                  />
                ))}
              </Container>
            </div>
          </Stack>
          {/* Results Card */}
          <Stack className="text-bg-dark" gap={3}>
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
              {searchResults.map((item, index) => (
                <Col key={index}>
                  <MovieCard movieInformation={item}></MovieCard>
                </Col>
              ))}
            </Row>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Search;
