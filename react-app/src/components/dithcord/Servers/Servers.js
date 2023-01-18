import React from 'react';
import { Wrapper } from '../DithcordStyles';

function Servers(user) {
    const currentUser = {...user.user}
    console.log('--------------SERVERS COMPONENT--------------\n', currentUser)

    return (
        <Wrapper>
            {currentUser.servers.map((server) => (
                <div key={server.id}>
                    <h1>{server.name}</h1>
                    <img src={`/images/server_images/${server.serverImage}`} alt='serverImg'></img>
                </div>
            ))}
        </Wrapper>
    )
}


export default Servers
