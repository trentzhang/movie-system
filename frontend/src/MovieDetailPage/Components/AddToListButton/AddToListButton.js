import cn from "classnames";
import React from "react";
import "../LikeButton/styles.scss";

const AddToListButton = ({ clickFunc }) => {
  return (
    <button onClick={clickFunc} className={cn("like-button-wrapper", {})}>
      <div className="like-button">
        <span>Add to list</span>
      </div>
    </button>
  );
};

export default AddToListButton;
