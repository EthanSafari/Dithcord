import React from 'react';
import { ServerWrapper, Wrapper, ImageWrapper, ServerImageWrapper } from '../DithcordStyles';
import { useDispatch } from 'react-redux';
import { getOneServer } from '../../../store/server';
import { getChannel, loadChannel } from '../../../store/channel';
import EditServerFormModal from '../Forms/ServerForm/ServerFormModal';
import ServerDropDownMenu from './ServerDropDownMenu';
import { getChannelMessages } from '../../../store/message';

function Servers({ user, servers }) {
    const dispatch = useDispatch()
    const currentServers = user.servers
    const realcurrent = Object.values(servers)

    console.log('', '\n', '--------------SERVERS COMPONENT DATA--------------', '\n', realcurrent, '\n', '')

    const oneServer = (serverId, channelId) => {
        dispatch(getOneServer(serverId))
        if(channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
        }
        else {
            dispatch(loadChannel({}))
        }
        return
    }

    return (
        <ServerWrapper>
            {realcurrent && realcurrent?.map((server) => (

                <div onClick={() => oneServer(server.id, server.channels[0]?.id)} key={server.id}>
                    {/* <h2>{server.name}</h2> */}
                    <ServerImageWrapper>
                    <ImageWrapper as="img" src={server.serverImage} />
                    </ServerImageWrapper>
                    {/* <ServerDropDownMenu /> */}
                </div>
            ))}
        </ServerWrapper>
    )
}


export default Servers
