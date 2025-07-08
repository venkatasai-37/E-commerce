import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img id="logo" src="/images/logo.jpg" width="140px" height="75px" />
      <button onClick={() => navigate("/")}>Home</button>
      <button id="mens" onClick={() => navigate("/mens")}>
        Mens
      </button>
      <button id="womens" onClick={() => navigate("/womens")}>
        Womens
      </button>
      <input class="input" placeholder="search" />
      <button id="favourite">
        <img src="/images/touch.png" />
      </button>
      <button id="cart">
        {" "}
        <img src="/images/cart.png" onClick={() => navigate("/cart")} />
      </button>
    </div>
  );
};
