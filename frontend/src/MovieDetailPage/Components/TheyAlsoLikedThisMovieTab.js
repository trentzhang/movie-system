import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.username} {props.email}
  </Tooltip>
);

export const genderDefaultAvater = (gender) => {
  if (gender === "male") {
    return "https://www.w3schools.com/howto/img_avatar.png";
  } else {
    return "https://www.w3schools.com/howto/img_avatar2.png";
  }
};

export function TheyAlsoLikedTab({ liked_users }) {
  console.log("liked_users :>> ", liked_users);
  return (
    <Card.Text>
      {liked_users[0]
        ? liked_users.map((value, index) => (
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(value)}
              key={index}
            >
              <Link to={`/user/${value.email}`}>
                <img
                  src={genderDefaultAvater(value.gender)}
                  className="rounded-circle my-avater-img"
                  alt="Avatar"
                  width={40}
                />
              </Link>
            </OverlayTrigger>
          ))
        : null}
    </Card.Text>
  );
}
