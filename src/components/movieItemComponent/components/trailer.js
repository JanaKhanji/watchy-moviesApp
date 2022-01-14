import React from "react";

export default function Trailer({ trailer }) {
  return (
    <div>
        <h2 className="mainTitle white">Trailer</h2>
        <div className="container mx-auto">
        <iframe
            width="100%"
            height="400s"
            title="Movie trailer"
            src={"https://www.youtube.com/embed/" + trailer.key}
        ></iframe>
        </div>
    </div>
  );
}
