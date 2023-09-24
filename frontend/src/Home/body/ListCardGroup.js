import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/themes/splide-default.min.css";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { coverURL } from "../../Misc/functions";
import CardHeader from "react-bootstrap/esm/CardHeader";
function ListCard(m) {
  m = m.m;
  return (
    <Card className="small text-center mx-2 text-bg-dark zoom-card">
      <Card.Body>
        <Link
          to={`/list/${m.id}`}
          className="text-bg-dark text-decoration-none"
        >
          <p className="text-truncate">{m.name}</p>
          <Card.Img src={coverURL(m.cover)} />
        </Link>
      </Card.Body>
      <CardHeader>Likes:{m.liked_num}</CardHeader>
    </Card>
  );
}
export function ListCardGroup({ Lists }) {
  const options = {
    type: "loop",
    perPage: 3,
    autoplay: true,
    // autoHeight: true,
    focus: "center",
    padding: "5rem",
    breakpoints: {
      840: { perPage: 2 },
      480: { perPage: 1 },
    },
  };
  const CardGroup =
    Lists && Lists[0] ? (
      <div>
        <Splide options={options} className="pb-4">
          {Lists.map((l) => {
            return (
              <SplideSlide key={l.id}>
                <ListCard m={l}></ListCard>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    ) : null;

  return CardGroup;
}
