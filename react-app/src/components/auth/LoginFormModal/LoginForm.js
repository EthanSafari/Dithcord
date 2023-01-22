import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-signup-form-page'>
      <div className='login-from-and-qr-code'>
        <div className='login-form-container'>
          <form onSubmit={onLogin}>
            <div className='welcome-back'>
            <div className='welcome-back-text'>Welcome back!</div>
            <div className='qr-code-text'>we are tho exthited to thee you again</div>
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='input'>
              <label className='label-name' htmlFor='email'>EMAIL</label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
                className='label'
              />
            </div>
            <div className='input'>
              <label className='label-name' htmlFor='password'>PATHWORD</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className='label'
              />
              <button type='submit' className='submit-button'>Login</button>
            </div>
            <div className='user-buttons'>
              <button className='submit-button' id='left' onClick={() => {
                setEmail('demo1@aa.io')
                setPassword('password1')
              }}>DemoUser1</button>
              <button className='submit-button' id='right' onClick={() => {
                setEmail('demo2@aa.io')
                setPassword('password2')
              }}>DemoUser2</button>
            </div>
          </form>
          <div className='register'>
            <div className='register-text'>
              Need an Account?
            </div>
            <NavLink to='/sign-up'>
              <div className='register-text'>
                Regithter Here
              </div>
            </NavLink>
          </div>
        </div>
        <div className='qr-code-container'>
          <img className='qr-code' src='https://cdn.discordapp.com/attachments/1063590516068991177/1064979049304313926/stsmall507x507-pad600x600f8f8f8.png' alt='qr-code' />
          <div className='qr-code-login'>Log in with QR Code</div>
          <div className='qr-code-text'>Thcan thith with the <strong style={{ fontSize: '16px' }}>Dithcord mobile app</strong> to log in inthantly</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
