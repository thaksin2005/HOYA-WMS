import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    fontSize: "24px",
  };
  return (
    <div style={style}>
      <p>Content Not Found</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
