import cn from "classnames";
import React, { useState } from "react";
import { backendUrl } from "../../../settings";
import { ReactComponent as Hand } from "./hand.svg";
import "./styles.scss";

const particleList = Array.from(Array(10));

export const LikeButton = ({
  currentUser,
  id,
  likedType,
  liked,
  onLikedChange,
}) => {
  const [clicked, setClicked] = useState(false);

  async function changeLike() {
    if (!currentUser) {
      alert("Please login first!");
      return false;
    }

    onLikedChange(!liked);

    const email = currentUser.email;
    const requestMethod = liked ? "DELETE" : "PUT";
    // Send API to update database when like button is clicked

    try {
      const request = {
        method: requestMethod,
        credentials: "omit",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      await fetch(`${backendUrl}/liked/${likedType}/${email}/${id}`, request);
    } catch (error) {
      console.log(error);
      alert("Oops! Like Operation API Wrong, Please Try Again!");
    }
  }

  return (
    <button
      onClick={() => {
        changeLike();
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      {liked && (
        <div className="particles">
          {particleList.map((_, index) => (
            <div
              className="particle-rotate"
              key={index}
              style={{
                transform: `rotate(${
                  (360 / particleList.length) * index + 1
                }deg)`,
              }}
            >
              <div className="particle-tick" />
            </div>
          ))}
        </div>
      )}
      <div className="like-button">
        <Hand />
        <span>Like</span>
        <span className={cn("suffix", { liked })}>d</span>
      </div>
    </button>
  );
};
