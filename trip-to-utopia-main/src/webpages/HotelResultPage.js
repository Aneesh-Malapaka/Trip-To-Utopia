import Header from "../components/Header";
import { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import { useLocation } from "react-router-dom";
import React from "react";

export default function HotelResultPage({ code }) {
  const location = useLocation();
  const [hotel, setHotel] = useState([]);

  // safely extract values
  const {
    area_name = "",
    date_in = "",
    date_out = "",
    adults = "",
    children = "",
    rooms = "",
  } = location.state || {};

  useEffect(() => {
    if (!location.state || !area_name) {
      console.log("Wrong input");
      return;
    }

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        "X-RapidAPI-Key": code,
      },
    };

    const get_hotels = (dest_id) => {
      fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${date_out}&units=metric&dest_id=${dest_id}&dest_type=city&locale=en-us&adults_number=${adults}&order_by=popularity&filter_by_currency=INR&checkin_date=${date_in}&room_number=${rooms}&children_number=${children}&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true`,
        options
      )
        .then((res) => res.json())
        .then((res) => setHotel(res.result || []))
        .catch((err) => console.error(err));
    };

    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-us&name=${area_name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const destid = res[0]?.dest_id;
        if (destid) {
          get_hotels(destid);
        }
      })
      .catch((err) => console.error(err));

  }, [location.state, code]);

  const hotels = hotel.map((item) => {
    return <HotelCard key={item.hotel_id} item={item} />;
  });

  return (
    <div className="HResultContainer">
      <Header />

      <div className="userInput d-flex justify-content-center">
        <div className="hotelInfo--fields px-3">
          <strong>Area:</strong> {area_name}
        </div>
        <div className="hotelInfo--fields px-3">
          <strong>DateIN:</strong> {date_in}
        </div>
        <div className="hotelInfo--fields px-3">
          <strong>DateOut:</strong> {date_out}
        </div>
        <div className="hotelInfo--fields px-3">
          <strong>Adults:</strong> {adults}
        </div>
        <div className="hotelInfo--fields px-3">
          <strong>Children:</strong> {children}
        </div>
        <div className="hotelInfo--fields px-3">
          <strong>Rooms:</strong> {rooms}
        </div>
      </div>

      <div className="HotelsResultContainer">
        {hotel.length ? (
          <section className="hotelcards--list d-flex flex-wrap">
            {hotels}
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}