import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function SearchHotel(props) {
  function capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }
  const initialValues = {
    area_name: '',
    date_in: '',
    date_out: '',
    adults: '',
    children: '',
    rooms: '',
  };

  const [values, setValues] = useState(initialValues);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  var ok = false;
  if (
    values.area_name !== '' &&
    values.date_in !== '' &&
    values.date_out !== '' &&
    values.adults !== '' &&
    values.children !== '' &&
    values.rooms !== ''
  ) {
    values.area_name = capitalizeWords(values.area_name);
    ok = true;
  }

  return (
    <div className="HotelSearchDiv">
      <div className="search-div">
        <div className="search-form">
          <form action="#" className="hotel-form">
            <div className="location">
              <label htmlFor="area_name">Area</label>
              <input
                type="text"
                name="area_name"
                id="area_name"
                value={values.area_name}
                onChange={handleInputChange}
                placeholder="Enter Area or Landmark or Country or Pincode"
              />
            </div>
            <br />

            <div className="dates">
              <div className="date-labels">
                <label htmlFor="date_in">Check-In Date</label>
                <label htmlFor="date_out">Check-out Date</label>
              </div>
              <div className="date-inp">
                <input
                  type="date"
                  name="date_in"
                  id="date_in"
                  value={values.date_in}
                  onChange={handleInputChange}
                  placeholder="Enter Check-in Date"
                />
                <input
                  type="date"
                  name="date_out"
                  id="date_out"
                  value={values.date_out}
                  onChange={handleInputChange}
                  placeholder="Enter Check-out Date"
                />
              </div>
            </div>

            <div className="rooms">
              <label htmlFor="Adults">Adults &#40; age &#62; 16 &#41;</label>
              <input
                type="number"
                name="adults"
                id="adults"
                value={values.adults}
                onChange={handleInputChange}
                placeholder="Enter number of Adults in your trip"
              />
              <br />
              <label htmlFor="Children">
                Children &#40; age &#60; 17 &#41;
              </label>
              <input
                type="number"
                name="children"
                id="children"
                value={values.children}
                onChange={handleInputChange}
                placeholder="Enter number of Children in your trip"
              />
              <br />
              <label htmlFor="Rooms">Rooms</label>
              <input
                type="number"
                name="rooms"
                id="rooms"
                value={values.rooms}
                onChange={handleInputChange}
                placeholder="Enter number of Rooms needed for your trip"
              />
            </div>
            <div className="inp--submit">
              <Link
                to={
                  ok
                    ? {
                        pathname: '/hotelresultpage',
                        state: values,
                      }
                    : { pathname: '/' }
                }
              >
                <button className="btn--locations">Get Hotels</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
