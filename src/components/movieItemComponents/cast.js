import React from "react";
import { Card } from 'react-bootstrap';
import imageSrc from "../../assets/img/movie.png";

export default function Casts({ casts }) {
  return (
    <div>
        <h2 className="text-light h2 border-bottom m-3">Casts</h2>
        <div className="d-flex flex-wrap justify-content-center">
            {casts.map((cast) => {
            return (
                <Card key={cast.id} className="m-1 text-dark custom-cast-card">
                    <Card.Img variant="top" style={{ minHeight: '160px' }} src={
                        cast.profile_path ? "http://image.tmdb.org/t/p/w200/" + cast.profile_path : imageSrc
                    } />
                    <Card.Body>
                        <Card.Title className="font-weight-bold small mb-0">{cast.name}</Card.Title>
                        <Card.Text className="small">{cast.character}</Card.Text>
                    </Card.Body>
                </Card>
            )})}
        </div>
    </div>
  );
}
