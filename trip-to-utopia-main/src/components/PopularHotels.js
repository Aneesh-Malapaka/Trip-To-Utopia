import PopularHotelsCard from './PopularHotelsCard';
import Data from '../data';
import React from 'react';

export default function PopularHotels() {
  let cards = Data.map((item) => {
    return <PopularHotelsCard key={item.id} item={item} />;
  });

  return (
    <div className="PopularHotelsCont">
      <h3 className="PopularHotelsText">
        Check <span className="PopularHotelsSpan">Hotels</span> at these{' '}
        <span className="PopularHotelsSpan">Popular</span> locations
      </h3>
      <section className="homecards--list">{cards}</section>
    </div>
  );
}
