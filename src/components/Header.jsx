import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header class="title-bg">
      <div class="title-container">
        <h1 class="title-text" data-text="FLIXSTER">
          FLIXSTER
        </h1>
        <div class="rain"></div>
      </div>
    </header>
  );
};

export default Header;
