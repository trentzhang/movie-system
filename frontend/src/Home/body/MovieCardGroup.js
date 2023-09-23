import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/themes/splide-default.min.css";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { coverURL } from "../../Misc/functions";

export function MovieCard({ movieInformation }) {
  return (
    <Card className="text-center mx-2 text-bg-dark border-light my-hover-card-zoom">
      <Card.Body>
        <Link
          to={`/movie/${movieInformation.id}`}
          className="text-light text-decoration-none"
        >
          <Card.Title className="text-truncate fs-6">
            {movieInformation.title}
          </Card.Title>
          <Card.Img src={coverURL(movieInformation.cover)} />
        </Link>
      </Card.Body>
    </Card>
  );
}
export function MovieCardGroup({ movies }) {
  const options = {
    type: "loop",
    perPage: 5,
    autoplay: true,
    // autoHeight: true,
    focus: "center",
    breakpoints: {
      640: { perPage: 4 },
      480: { perPage: 3 },
    },
  };
  return (
    <div>
      <Splide options={options} className="pb-3">
        {movies.map((m) => {
          return (
            <SplideSlide key={m.id} className="py-2">
              <MovieCard movieInformation={m}></MovieCard>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}
