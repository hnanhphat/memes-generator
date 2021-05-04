import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div id="_404" className="_404">
      <h1>404</h1>
      <p>
        The page you are looking for does not exist.
        <br />
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
