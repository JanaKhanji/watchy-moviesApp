import React from "react";
import { Navbar } from "react-bootstrap";

export default function Footer() {
  return (
    <Navbar sticky="bottom" className="mt-3 px-2">
      <div className="w-100 text-center text-light">
        Made by{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/JanaKhanji"
        >
          Jana Khanji
        </a>
      </div>
    </Navbar>
  );
}
