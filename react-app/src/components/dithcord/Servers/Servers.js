import React from 'react';
import { ServerWrapper, Wrapper, ImageWrapper } from '../DithcordStyles';
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
        <ServerWrapper>
            {servers.map((server) => (
                <div onClick={() => oneServer(server.id)} key={server.id}>
                    <h2>{server.name}</h2>
                    <ImageWrapper as="img" src={`/images/server_images/${server.serverImage}`} />
                </div>
            ))}
        </ServerWrapper>
    )
}


export default Servers
