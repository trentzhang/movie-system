import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/themes/splide-default.min.css";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { coverURL } from "../../Misc/functions";
import CardHeader from "react-bootstrap/esm/CardHeader";

export function ListCardGroup({ Lists }) {
  const options = {
    type: "loop",
    perPage: 4,
    autoplay: true,
    // autoHeight: true,
    focus: "center",
    padding: "5rem",
    breakpoints: {
      640: { perPage: 3 },
      480: { perPage: 2 },
    },
  };
  if (Lists && Lists[0]) {
    return (
      <Container>
        <Splide options={options} className="pb-4">
          {Lists.map((m) => {
            return (
              <SplideSlide key={m.id}>
                <Card className="text-center mx-2 text-bg-dark">
                  <Card.Body>
                    <Link
                      to={`/list/${m.id}`}
                      className="text-bg-dark text-decoration-none"
                    >
                      <Card.Title className="text-truncate fs-6">
                        {m.name}
                      </Card.Title>
                      <Card.Img src={coverURL(m.cover)} />
                    </Link>
                  </Card.Body>
                  <CardHeader>Likes:{m.liked}</CardHeader>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Container>
    );
  } else {
    return <Container>No list available, create a list! </Container>;
  }
}
