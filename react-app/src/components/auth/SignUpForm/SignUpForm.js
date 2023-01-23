import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([])
  const [submit, setSubmit] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setSubmit(true)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(() => {
    const errors = []
    if (!username) errors.push('Username required')
    if (username.length < 2 || username.length > 15) errors.push('Uthername length mutht be between 2 and 15 characters')
    if (!email || !email.includes('@')) errors.push('Email required')
    if (!password) errors.push('Password required')
    if (!repeatPassword) errors.push('Please confirm password')
    if (password !== repeatPassword) errors.push('Passwords do not match')
    setValidationErrors(errors)
    setSubmit(false)
  }, [email, username, password, repeatPassword])

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-signup-form-page'>
      <div className='sign-up-form'>
        <div className='welcome-back-text'>Create an account</div>
        <ul className="sign-up-errors">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <ul>
          {submit && validationErrors.length > 0 && validationErrors.map(error => (
            <li className="error-messages" key={error}>{error}</li>))}
        </ul>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='input input-margin'>
            <label className='label-name'>EMAIL</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              className='label sign-up-label'
            ></input>
          </div>
          <div className='input input-margin'>
            <label className='label-name'>UTHERNAME</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              className='label sign-up-label'
            ></input>
          </div>
          <div className='input input-margin'>
            <label className='label-name'>PATHWORD</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              className='label sign-up-label'
            ></input>
          </div>
          <div className='input input-margin'>
            <label className='label-name'>CONFIRM PATHWORD</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className='label sign-up-label'
            ></input>
          </div>
          <button type='submit' className='submit-button'>Thign Up</button>
        </form>
        <NavLink to={'/login'}>
          <div className='have-an-account'>Already have an account?</div>
        </NavLink>
        <div className='terms-agreement'>
          By regithering, you agree to Dithcord'th termth of Thervithe and Privathy Polithy
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
