import React from 'react';
import { Wrapper } from '../DithcordStyles';

function Servers(user) {
    const currentUser = {...user.user}
    console.log('', '\n', '--------------SERVERS COMPONENT DATA--------------', '\n', currentUser, '\n', '')

    return (
        <Wrapper>
            {currentUser.servers.map((server) => (
                <div key={server.id}>
                    <h2>{server.name}</h2>
                    <img src={`/images/server_images/${server.serverImage}`} alt='serverImg'></img>
                </div>
            ))}
        </Wrapper>
    )
}


export default Servers
