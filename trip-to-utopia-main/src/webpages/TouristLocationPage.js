import Header from '../components/Header';
import { useState } from 'react';
import PopularPlaces from '../components/PopularPlaces';
import ClosestPlaces from '../components/ClosestPlaces';
import React from 'react';

export default function TouristLocationPage(props) {
  var places,
    cplaces = [];

  function get_nearby_places(id) {
    console.log(id);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      },
    };

    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/nearby-places?hotel_id=${id}&locale=en-gb`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // var res =
        console.log(response.landmarks);
        setPopular(response.landmarks.populars);
        setClosest(response.landmarks.closests);
      })
      .catch((err) => console.error(err));
  }

  function get_hotels(dest_id, hname) {
    let destID = dest_id;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        'X-RapidAPI-Key': '9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de',
      },
    };

    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=2022-10-01&units=metric&dest_id=${destID}&dest_type=city&locale=en-us&adults_number=2&order_by=popularity&filter_by_currency=INR&checkin_date=2022-09-30&room_number=1&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        for (var i = 0; i < response.result.length; i++) {
          if (hname === response.result[i].hotel_name) {
            var id = response.result[i].hotel_id;
          }
        }

        get_nearby_places(id);
      })
      .catch((err) => console.error(err));
  }

  function func() {
    let val = document.getElementById('cname').value;
    let hotelName = document.getElementById('hname').value;

    if ((val.length > 0) & (hotelName.length > 0)) {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
          'X-RapidAPI-Key':
            '9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de',
        },
      };

      fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-us&name=${val}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          var destid = response[0].dest_id;

          get_hotels(destid, hotelName);
        })
        .catch((err) => console.error(err));
    } else {
      console.log('Sarigga enter cheyyi bey!');
    }
  }

  function click(e) {
    e.preventDefault();
    func();
  }
  const [cityName, setCityName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [popular, setPopular] = useState([]);
  const [closest, setClosest] = useState([]);

  places = popular.map((item) => {
    // console.log(places)
    return <PopularPlaces key={item.group_id} item={item} />;
  });
  cplaces = closest.map((item) => {
    // console.log(places)
    return <ClosestPlaces key={item.group_id} item={item} />;
  });

  return (
    <div className="TouristLocation--container">
      {/* <h1>Tourist location page</h1> */}
      <Header />
      <div className="locations--container">
        <div className="locations--inp">
          <div className="inp--field">
            <label htmlFor="hname">City Name</label>
            <br />
            <input
              type="text"
              name="cname"
              id="cname"
              placeholder="Enter the City name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <div className="inp--field">
            <label htmlFor="hname">Hotel Name</label>
            <br />
            <input
              type="text"
              name="hname"
              id="hname"
              placeholder="Enter the Hotel name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>
          <div className="inp--submit">
            <button className="btn--locations" onClick={click}>
              Get locations
            </button>
          </div>
        </div>
        <div className="locations--display">
          <h2 className="locations--title">Popular Places Near your Hotel</h2>
          {popular.length ? (
            <section className="popularcards--list">{places}</section>
          ) : (
            ' '
          )}
        </div>

        <div className="locations--display">
          <h2 className="locations--title">Closest Places Near your Hotel</h2>
          {closest.length ? (
            <section className="closestcards--list">{cplaces}</section>
          ) : (
            ' '
          )}
        </div>
      </div>
    </div>
  );
}
