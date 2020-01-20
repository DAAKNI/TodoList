import React from "react";

const NavBar = props => {
  return (
    <nav style={{ backgroundColor: "lightgrey", marginBottom: "10px" }}>
      <div>
        <span>{props.totalItems} tasks unfinished</span>
      </div>
    </nav>
  );
};

export default NavBar;
