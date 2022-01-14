import React from "react";
import { Card } from 'react-bootstrap';
import imageSrc from "../../../assets/img/movie.png";

export default function Casts({ casts }) {
  return (
    <div>
        <h2 className="mainTitle white">Casts</h2>
        <div className="d-flex flex-wrap justify-content-center">
            {casts.map((cast) => {
            return (
                <Card key={cast.id} className="m-1 text-dark" style={{ width: '200px' }} >
                    <Card.Img variant="top" style={{ minHeight: '190px' }} src={
                        cast.profile_path ? "http://image.tmdb.org/t/p/w200/" + cast.profile_path : imageSrc
                    } />
                    <Card.Body>
                        <Card.Title className="h6 mb-0">{cast.name}</Card.Title>
                        <Card.Text className="small">{cast.character}</Card.Text>
                    </Card.Body>
                </Card>
            )})}
        </div>
    </div>
  );
}
