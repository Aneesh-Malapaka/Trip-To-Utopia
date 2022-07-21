// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export default function PopularHotelsCard(props) {
  return (
    <div className="cards">
      <img className="card--image" src={props.item.image} alt="Fuji" />
      <div className="card--info">
        <h2 className="card--location">
          <i className="fas fa-map-marker-alt"></i>
          {props.item.name}
          <span className="maps">
            <a href={props.item.url}>View on RoadGoat</a>
          </span>
        </h2>
        <span className="card--rating">
          <FontAwesomeIcon className="rating--ico" icon={faStar} />
          &nbsp;{props.item.stars}
        </span>
        <p className="card--description">{props.item.description}</p>
      </div>
    </div>
  );
}
