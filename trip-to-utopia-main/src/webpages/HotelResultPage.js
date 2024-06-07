import Header from "../components/Header";
import { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import { useLocation } from "react-router-dom";
import React from "react";

export default function HotelResultPage(props) {
  const [state, setState] = useState({
    area_name: "",
    date_in: "",
    date_out: "",
    adults: "",
    children: "",
    rooms: "",
  });

  const { area_name, date_in, date_out, adults, children, rooms } = state;
  const location = useLocation();
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    const get_hotels = (dest_id) => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
          "X-RapidAPI-Key":
            "9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de",
        },
      };

      fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${state.date_out}&units=metric&dest_id=${dest_id}&dest_type=city&locale=en-us&adults_number=${state.adults}&order_by=popularity&filter_by_currency=INR&checkin_date=${state.date_in}&room_number=${state.rooms}&children_number=${state.children}&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setHotel(response.result);
        })
        .catch((err) => console.error(err));
    };

    setState({ ...location.state, area_name: location.state.area_name });

    if (location.state.area_name.length > 0) {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
          "X-RapidAPI-Key":
            "9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de",
        },
      };

      fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-us&name=${location.state.area_name}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          var destid = response[0].dest_id;
          get_hotels(destid);
        })
        .catch((err) => console.error(err));
    } else {
      console.log("Wrong input");
    }
  }, [
    location.state,
    setState,
    state.adults,
    state.children,
    state.date_in,
    state.date_out,
    state.rooms,
  ]);

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
          " "
        )}
      </div>
    </div>
  );
}
