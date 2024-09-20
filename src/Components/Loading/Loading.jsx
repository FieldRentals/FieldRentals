import React from "react";
import LoadingAnimation from "../.././images/LoadingAnimation.gif";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="LoadingContainer">
      <img src={LoadingAnimation} alt="Loading" />
    </div>
  );
}
