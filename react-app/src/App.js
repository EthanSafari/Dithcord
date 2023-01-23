import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dithcord from './components/dithcord/Dithcord'
import LoginForm from './components/auth/LoginFormModal/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Testing from './components/Testing'
import { authenticate } from './store/session';
import Greeting from './components/ModalTest';
import NotLogInLanding from './components/LoggedOut/Landing';
import LoginSignUpPage from './components/LoggedOut/LoginSignUpPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/testing' exact={true} >
          <Testing />
          <Greeting />
        </ProtectedRoute>
        <ProtectedRoute path='/login-or-signup' exact={true}>
          <LoginSignUpPage />
        </ProtectedRoute>
        <ProtectedRoute path='/dithcord' exact={true} >
          <Dithcord />
        </ProtectedRoute>
        <ProtectedRoute path='/dithcord' exact={true} >
          <Dithcord />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {!sessionUser ? (
            <NotLogInLanding />
          ) : (
            <Dithcord />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
