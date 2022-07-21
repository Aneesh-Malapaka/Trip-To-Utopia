import React, { useState } from 'react';
import { getAirport } from '../LocationsApi';
import Header from './Header';
import axios from 'axios';
// import { flight_availabilities } from './data';

import carrier_codes from './carrier-codes.json';
import iata_codes from './iata-codes.json';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const queryString = require('query-string');

const airportStaticData = [
  {
    icao: 'VOHS',
    iata: 'HYD',
    name: 'Hyderabad, Rajiv Gandhi',
    shortName: 'Rajiv Gandhi',
    municipalityName: 'Hyderabad',
    location: {
      lat: 17.231318,
      lon: 78.429855,
    },
    countryCode: 'IN',
  },
  {
    icao: 'VOHY',
    iata: 'BPM',
    name: 'Hyderabad, Begumpet',
    shortName: 'Begumpet',
    municipalityName: 'Hyderabad',
    location: {
      lat: 17.4531,
      lon: 78.4676,
    },
    countryCode: 'IN',
  },
  {
    icao: 'OPKD',
    iata: 'HDD',
    name: 'Hyderabad',
    shortName: 'Hyderabad',
    municipalityName: 'Hyderabad',
    location: {
      lat: 25.318098,
      lon: 68.3661,
    },
    countryCode: 'PK',
  },
];

export default function FlightPage() {
  const [airportArrivalData, setAirportArrivalData] = useState([]);
  const [airportDepartureData, setAirportDepartureData] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const selectArrivalAirport = React.useRef();
  const selectDepartureAirport = React.useRef();

  const selector = useSelector((state) => state);
  const arrivalInput = React.useRef();
  const departureInput = React.useRef();
  const history = useHistory();

  const getFlights = () => {
    axios({
      method: 'post',
      url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
      data: queryString.stringify({
        grant_type: 'client_credentials',
        client_id: 'jd78wJKzkMaIIVUqLGdv9HjZhrmEvzPl',
        client_secret: 'F5Rk46qlUBOUJ5il',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        fetch(
          'https://test.api.amadeus.com/v1/shopping/availability/flight-availabilities',
          {
            headers: {
              Authorization: 'Bearer ' + res.data.access_token,

              'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              originDestinations: [
                {
                  id: '1',
                  originLocationCode: selectArrivalAirport.current.value,
                  destinationLocationCode: selectDepartureAirport.current.value,
                  departureDateTime: {
                    date: '2022-07-14',
                  },
                },
              ],
              travelers: [
                {
                  id: '1',
                  travelerType: 'ADULT',
                },
              ],
              sources: ['GDS'],
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setFlightData(res.data);
          })
          .catch((e) => console.log(e, 'ERROR'));

        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e, 'ERROR');
      });
  };

  const getAirportData = () => {
    // console.log(arrivalInput.current.value, 'ARRIVAL');
    // console.log(departureInput.current.value, 'DEPARTURE');

    getAirport(arrivalInput.current.value)
      .then(function (response) {
        // console.log(response.data);

        setAirportArrivalData(response.data.items);

        if (response.data.items.length === 0) {
          return alert('No Airports found');
        }
      })
      .catch(function (error) {
        console.error(error);
        return error;
      });

    getAirport(departureInput.current.value)
      .then(function (response) {
        //access_token
        // console.log(response.data);

        if (response.data.items.length === 0) {
          return alert('No Airports found');
        }

        setAirportDepartureData(response.data.items);

        // return response.data;
      })
      .catch(function (error) {
        return error;
      });
  };

  const bookTicket = (item) => {
    // console.log(item);

    if (selector.email === '') {
      return history.push('/loginPage');
    }

    axios
      .post('http://localhost:3002/order_now', {
        ...item,
        email: selector.email,
      })
      .then((res) => {
        alert('Plane Info SUCCESSFULLY Placed!!');

        // isSubmit(false)
      })
      .catch((e) => {
        alert('ERROR WHILE PLACING ORDER');
        console.log('ERROR WHILE PLACING ORDER');
        console.log(e);
        // isSubmit(false)
      });
  };

  return (
    <div>
      <Header />
      {/* Flight Page */}

      <div className="p-5">
        {airportArrivalData.length !== 0 ? (
          <div className="form-group my-3">
            <label>Select Departure Airport</label>
            <select
              className="form-control form-control-lg "
              ref={selectArrivalAirport}
            >
              {airportArrivalData.map((i) => (
                <option value={i.iata}>{i.name}</option>
              ))}
            </select>

            <div className="my-3">
              <label>Select Arrival Airport</label>
              <select
                className="form-control form-control-lg "
                ref={selectDepartureAirport}
              >
                {airportDepartureData.map((i) => (
                  <option value={i.iata}>{i.name}</option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <button className="btn btn-lg btn-primary" onClick={getFlights}>
                Get Flights
              </button>
            </div>

            <hr />
            <h6 className="text-muted" style={{ verticalAlign: 'middle' }}>
              <span className="text-primary"></span>
            </h6>

            {flightData !== undefined
              ? flightData.map((i) => {
                  return i.segments.map((j) => {
                    return (
                      <div className="flight_item p-3 my-3">
                        {
                          <div className="row align-items-center  justify-content-center">
                            <div className="col-lg-3 h5">
                              {carrier_codes.map((i) => {
                                return i.code === j.carrierCode ? (
                                  <div>{i.name}</div>
                                ) : null;
                              })}
                              <div className="h6 text-primary py-2 ">
                                {j.carrierCode}
                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              {iata_codes.map((i) => {
                                return i.code === j.departure.iataCode ? (
                                  <div className="h4">{i.locality}</div>
                                ) : null;
                              })}

                              <div className="text-muted">
                                {' '}
                                {new Date(
                                  j.departure.at
                                ).toLocaleDateString()}{' '}
                                -{' '}
                                {new Date(j.departure.at).toLocaleTimeString()}
                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              {iata_codes.map((i) => {
                                return i.code === j.arrival.iataCode ? (
                                  <div className="h4">{i.locality}</div>
                                ) : null;
                              })}

                              <div className="text-muted">
                                {' '}
                                {new Date(
                                  j.arrival.at
                                ).toLocaleDateString()} -{' '}
                                {new Date(j.arrival.at).toLocaleTimeString()}
                              </div>
                            </div>
                            <div className="col-lg-1 ">
                              <button
                                className="btn btn-primary btn-lg"
                                onClick={() => bookTicket(i)}
                              >
                                BOOK
                              </button>
                            </div>
                          </div>
                        }
                      </div>
                    );
                  });
                })
              : null}
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label>Enter Arrival Location</label>
              <div className=" d-flex">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  placeholder="Enter Arrival Location"
                  ref={arrivalInput}
                />
              </div>
            </div>
            <div className="my-3">
              <label>Enter Departure Location</label>
              <div className=" d-flex">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  placeholder="Enter Departure Location"
                  ref={departureInput}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-lg btn-primary"
                onClick={getAirportData}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
