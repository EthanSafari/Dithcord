import React from 'react';
import { ServerWrapper, Wrapper, ImageWrapper } from '../DithcordStyles';
import { useDispatch } from 'react-redux';
import { getOneServer } from '../../../store/server';
import { getChannel, loadChannel } from '../../../store/channel';

function Servers({ user }) {
    const dispatch = useDispatch()
    const currentUser = user
    const servers = currentUser.servers
    console.log('', '\n', '--------------SERVERS COMPONENT DATA--------------', '\n', servers, '\n', '')

    const oneServer = (serverId, channelId) => {
        dispatch(getOneServer(serverId))
        if(channelId) {
            dispatch(getChannel(channelId))    
        }
        else {
            dispatch(loadChannel({}))
        }
        return 
    }

    return (
        <ServerWrapper>
            {servers && servers.map((server) => (
                <div onClick={() => oneServer(server.id, server.channels[0]?.id)} key={server.id}>
                    <h2>{server.name}</h2>
                    <ImageWrapper as="img" src={`/images/server_images/${server.serverImage}`} />
                </div>
            ))}
        </ServerWrapper>
    )
}


export default Servers
