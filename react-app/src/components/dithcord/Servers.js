import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper } from './ComponentStyling';

function Servers(user) {
    const currentUser = user.user.sessionUser
    console.log('----SERVERS COMPONENT----\n', `${currentUser} \n`)

    return (
        <Wrapper>
            <p>{currentUser.username}</p>
        </Wrapper>
    )
}

export default Servers
