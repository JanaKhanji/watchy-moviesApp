import React from "react";
import { Navbar } from "react-bootstrap";

export default function Footer() {
  return (
    <Navbar sticky="bottom" className="footer">
      <p>
        Made with <span> ❤ </span>
        by{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/JanaKhanji"
        >
          Jana Khanji
        </a>
      </p>
    </Navbar>
  );
}
