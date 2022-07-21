// import { RiHotelLine } from 'react-icons/ri';
// import { HashLink as Link } from 'react-router-hash-link';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import Logo from '../Logooo.png';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
  // const listStyle = {
  //   color: 'black',
  // };

  const selector = useSelector((state) => state);
  // console.log(selector);
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('admin');
    // console.log(selector, 'SELECTOR');
    dispatch({ type: 'reset_data' });

    history.push('/');
  };

  return (
    <div className="header-div">
      <div className="logo-div">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="options-div">
        <ul className="options-list">
          <Link className="LinkTag" to="/">
            <li className="options">
              <i className="fas fa-hotel"></i>
              <span className="option--text">Hotels</span>
            </li>
          </Link>
          <Link className="LinkTag" to="/flights">
            <li className="options">
              <i className="fas fa-plane"></i>
              <span className="option--text">Flights</span>
            </li>
          </Link>
          <Link className="LinkTag" to="/touristlocations">
            <li className="options">
              <i className="fas fa-globe"></i>
              <span className="option--text">Tourist Attraction</span>
            </li>
          </Link>
        </ul>
      </div>
      {selector.email !== '' ? (
        <div className="accLogin-div">
          {selector.email}
          <button className="mx-4" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="accLogin-div">
          <Link to="/loginpage">
            <button className="accLogin-btn">Login/Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
}
