import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Like = (props) => {
  let classes = props.liked ? solidHeart : faHeart;
  return (
    <FontAwesomeIcon
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      icon={classes}
    />
  );
};

export default Like;
