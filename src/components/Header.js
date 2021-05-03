import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header" className="header">
      <div className="header__left">Meme Generator</div>
      <div className="header__right">
        <Link to="/">Create Meme</Link>
        <Link to="gallery">Gallery</Link>
      </div>
    </header>
  );
};

export default Header;
