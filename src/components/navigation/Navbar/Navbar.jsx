import React from "react";
import icon from "../../../assets/images/icon.svg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar--content">
        <img src={icon} alt="two ways arrows" />
        <span>unit converter</span>
      </div>
    </div>
  );
}

export default Navbar;
