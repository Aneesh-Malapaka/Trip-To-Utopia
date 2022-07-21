import axios from 'axios';
import React, { useState } from 'react';
import { Form as div } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Form.css';
const LoginPage = (props) => {
  const email = React.createRef();
  const password = React.createRef();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: '',
    Password: '',
  });

  const history = useHistory();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = () => {
    console.log('LOGIN CLICKED');
    axios
      .post('http://localhost:3002/login', {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        console.log(localStorage.getItem('token'));
        dispatch({ type: 'add_email', payload: res.data.email });
        setTimeout(() => {
          history.push('/');
        }, 100);
      })
      .catch((err) => {
        alert('Password/Username Does not exist!!');
      });
  };

  return (
    <div
      className="d-flex text-center align-items-center justify-content-center custom_bg "
      style={{ height: '100vh' }}
    >
      <div className="con_width bg_white">
        <h2>Login Form</h2>
        <br />
        <div.Group controlId="email" className="text-start">
          <div.Label>Email</div.Label>
          <div.Control
            type="email"
            placeholder="Enter email"
            name="email"
            ref={email}
          />
        </div.Group>

        <div className="register-form text-start">
          <div.Group controlId="Password">
            <div.Label>Password</div.Label>
            <div.Control
              type="password"
              placeholder="Enter Password"
              name="Password"
              ref={password}
            />
          </div.Group>

          <div className="py-5 text-center ">
            <button className="btn btn-primary btn-lg mx-3" onClick={login}>
              Login
            </button>
            <Link
              className="btn btn-primary btn-lg"
              to={{
                pathname: '/registerPage',
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
