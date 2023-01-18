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
    <div className='login-form-page'>
      <div className='login-form-container'>

        <form onSubmit={onLogin}>
          <div className='dithcord'>Welcome back</div>
          <div>we are tho exthited to thee you again</div>
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
            />
            <button type='submit'>Login</button>
          </div>
        </form>
        <div className='register'>
          <div className='register-text'>
            Need an Account?
          </div>
          <NavLink to={'/signup'}>
            <div className='register-text'>
              Regithter Here
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
