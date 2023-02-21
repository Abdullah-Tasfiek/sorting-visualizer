import React, { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  return (
    <div className="Hamburger">
      <button onClick={() => setIsOpen(!isOpen)}>&#9776;</button>
      {isOpen && (
        <div
          className="Hamburger__background"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            width: "200px",
            background: "#16233E",
            zIndex: 1,
          }}
        >
          <div className="Hamburger__close" onClick={() => setIsOpen(!isOpen)}>&#9776;</div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
