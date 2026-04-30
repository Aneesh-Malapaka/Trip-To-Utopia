import React from 'react';

import TouristLocationPage from './webpages/TouristLocationPage.js';
import HotelResultPage from './webpages/HotelResultPage.js';
import HotelBooking from './webpages/HotelBooking';
import LoginPage from './LoginAndSignUp/LoginPage';
import RegisterPage from './LoginAndSignUp/RegisterPage';
import FlightPage from './components/FlightPage.js';

import Header from './components/Header.js';
import SearchHotel from './components/SearchHotel';
import PopularHotels from './components/PopularHotels';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

const apiKey = process.env.REACT_APP_API_KEY;
function App() {
  return (
    <div>
      <Router>
        <div className="fluid-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/touristlocations">
              <TouristLocationPage code={apiKey} />
            </Route>
            <Route path="/loginPage" component={LoginPage} />
            <Route path="/registerPage" component={RegisterPage} />
            <Route path="/flights" component={FlightPage}></Route>
            <Route path="/hotelresultpage">
              <HotelResultPage code={apiKey} />
            </Route>
            <Route path="/hotelbookingpage/:hotelId">
              <HotelBooking code={apiKey} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
function Home() {
  return (
    <div className="fluid-container">
      <Header />
      <SearchHotel />
      <PopularHotels />
      <Footer />
    </div>
  );
}

export default App;
