import React from 'react';
import './Landing.css';
import logo from '../images/dithcord_logo.png'

import NotLoggedInParts from '../MiddleParts';
import DropDownMenuFrontPage from '../DropDownMenu';
import { partsArray } from '../data';
import LoginForm from '../../auth/LoginFormModal/LoginForm';
import { NavLink, Route, Switch } from 'react-router-dom';
import LoginModal from '../../auth/LoginFormModal';
import LoginSignUpPage from '../LoginSignUpPage';

const NotLogInLanding = () => {
    return (
        <div className='main-page'>
            <div className='top-portion'>
                <div className='top-portion-top'>
                    <div className='logo-and-dithcord'>
                        <img src={logo} alt='logo' className='logo' />
                        <div className='dithcord'>Dithcord</div>
                    </div>
                    <div>
                        <div>
                            <NavLink to='/login'>
                                <button>Login</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='top-portion-content'>
                    <h1 className='top-portion-heading'>IMAGINE A PLATHE...</h1>
                    <div className='top-portion-description'>
                        <div style={{ width: '45rem' }}>
                            ...where you can belong to a thchool club, a gaming group, or a worldwide art community. Where juth you and a handful of friendth can thpend time together. A place that maketh it eathy to talk every day and hang out more often.</div>
                    </div>
                    <div className='top-portion-buttons'>
                        <div className='top-buttons'>
                            <button className='top-portion-button'>Download for Windowth</button>
                            <button className='top-portion-button'>Open Dithcord in your browther</button>
                        </div>
                    </div>
                </div>
                <div>picture</div>
            </div>
            <NotLoggedInParts partsArray={partsArray} />
            <div>Ready to thart your journey?</div>
            <button>Download for Windowth</button>
            <div>
                <div className='bottom-portion'>
                    <div className='bottom-portion-top'>
                        <div>IMAGINE A PLACE</div>
                        <div>Englith, USA</div>
                        <div>Thocial Media</div>
                    </div>
                    <DropDownMenuFrontPage />
                </div>
                <div className='bottom-portion-bottom'>
                    <div>Dithcord</div>
                    <button>Thign Up</button>
                </div>
            </div>
        </div>
    );
};

export default NotLogInLanding;
