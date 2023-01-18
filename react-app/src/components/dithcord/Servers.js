import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper } from './ComponentStyling';

function Servers(user) {
    const currentUser = user.user.sessionUser
    console.log('----SERVERS COMPONENT----\n', `${currentUser} \n`)

    return (
        <Wrapper>
            {currentUser.servers.map((server) => (
                <div>
                    <h1>{server.name}</h1>
                    <img src={`/images/server_images/${server.serverImage}`}></img>
                </div>
            ))}
        </Wrapper>
    )
}

export default Servers
