import React from "react";

export default function Trailer({ trailer }) {
  return (
    <div>
        <h2 className="text-light h2 border-bottom m-3">Trailer</h2>
        <div className="mx-4">
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
