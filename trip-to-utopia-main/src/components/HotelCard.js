import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { useState } from 'react';

export default function HotelCard(props) {
  var value = props.item.hotel_id;

  return (
    <Link
      className="LinkTag"
      to={{
        pathname: '/hotelbookingpage/' + value,
      }}
    >
      <div className="hotel--cards">
        <img
          className="hotel--image"
          src={props.item.max_photo_url}
          alt={props.item.hotel_name}
        />
        <div className="hotelcard--info">
          <div className="hotel--info">
            <div className="basic--info">
              <h3 className="hotel--name">{props.item.hotel_name}</h3>
              <p className="hotel--type">
                {props.item.accommodation_type_name}
              </p>
              <p className="hotel--address">{props.item.address}</p>
            </div>
            <div className="price--info">
              <h3>₹ {props.item.price_breakdown.gross_price}</h3>
            </div>
          </div>

          <div className="rating--info">
            <p className="hotel--rating">
              <FontAwesomeIcon className="rating--ico" icon={faStar} />
              &nbsp;{props.item.review_score}
            </p>
            <p className="hotel--review">{props.item.review_score_word}</p>
            <p className="number">{props.item.review_nr} reviews</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
