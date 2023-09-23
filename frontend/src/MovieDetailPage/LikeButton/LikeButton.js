import cn from "classnames";
import React, { useState, useEffect } from "react";
import { ReactComponent as Hand } from "./hand.svg";
import "./styles.scss";

const particleList = Array.from(Array(10));

const LikeButton = ({ liked, clickFunc }) => {
  //   console.log(liked);
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onClick={() => {
        clickFunc();
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

export default LikeButton;
