import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/themes/splide-default.min.css";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { coverURL } from "../../Misc/functions";
import CardHeader from "react-bootstrap/esm/CardHeader";
function ListCard(m) {
  return (
    <Card className="text-center mx-2 text-bg-dark zoom-card">
      <Card.Body>
        <Link
          to={`/list/${m.id}`}
          className="text-bg-dark text-decoration-none"
        >
          <Card.Title className="text-truncate fs-6">{m.name}</Card.Title>
          <Card.Img src={coverURL(m.cover)} />
        </Link>
      </Card.Body>
      <CardHeader>Likes:{m.liked}</CardHeader>
    </Card>
  );
}
export function ListCardGroup({ Lists }) {
  const options = {
    type: "loop",
    perPage: 5,
    autoplay: true,
    // autoHeight: true,
    focus: "center",
    padding: "5rem",
    breakpoints: {
      640: { perPage: 2 },
      480: { perPage: 1 },
    },
  };
  const CardGroup = (
    <div>
      <Splide options={options} className="pb-4">
        {Lists.map((m) => {
          return (
            <SplideSlide key={m.id}>
              <ListCard m={m}></ListCard>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
  return Lists && Lists[0] ? CardGroup : null;
}
