import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Form.css';

const RegisterPage = (props) => {
  const name = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const confirmPassword = React.createRef();
  const history = useHistory();

  const submit = () => {
    axios
      .post('http://localhost:3002/signup', {
        username: name.current.value,
        password: password.current.value,
        email: email.current.value,
      })
      .then((res) => {
        localStorage.removeItem('token');
        // console.log(res, 'SIGNUP');
        alert('User signed up');

        history.push('/loginpage');
      })
      .catch((e) => {
        // console.log(e);
        alert('Error Signing user');
      });
  };

  const [state, setState] = useState({
    username: '',
    email: '',
    pass: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="d-flex  align-items-center justify-content-center  custom_bg"
      style={{ height: '100vh' }}
    >
      <div className="con_width  bg_white">
        <h2>Registration Form</h2>
        <br />

        <Form.Group controlId="username" className="my-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            ref={name}
          />
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            ref={email}
          />
        </Form.Group>
        <Form.Group controlId="pass" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="pass"
            ref={password}
          />
        </Form.Group>

        <div className="text-center py-3">
          <button className="btn btn-primary btn-lg mx-3" onClick={submit}>
            Register
          </button>

          <br />
          <br />
          <div className="text-center h6 text-muted">
            Already have an account?{' '}
            <Link to={{ pathname: '/loginPage' }}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
