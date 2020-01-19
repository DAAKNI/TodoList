import React from "react";

const NavBar = props => {
  return (
    <nav>
      <div>
        <span>{props.totalItems} tasks unfinished</span>
      </div>
    </nav>
  );
};

export default NavBar;
