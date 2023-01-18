import React from 'react';
import { Wrapper } from '../DithcordStyles';
import { useDispatch } from 'react-redux';
import { getOneServer } from '../../../store/server';

function Servers(user) {
    const dispatch = useDispatch()
    const currentUser = {...user.user}
    const servers = currentUser.servers
    console.log('', '\n', '--------------SERVERS COMPONENT DATA--------------', '\n', servers, '\n', '')

    const oneServer = (serverId) => {
        return dispatch(getOneServer(serverId))
    }

    return (
        <Wrapper>
            {servers.map((server) => (
                <div onClick={() => oneServer(server.id)} key={server.id}>
                    <h2>{server.name}</h2>
                    <img src={`/images/server_images/${server.serverImage}`} alt='serverImg'></img>
                </div>
            ))}
        </Wrapper>
    )
}


export default Servers
