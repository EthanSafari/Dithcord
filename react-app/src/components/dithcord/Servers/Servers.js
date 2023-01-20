import React from 'react';
import { ServerWrapper, Wrapper, ImageWrapper } from '../DithcordStyles';
import { useDispatch } from 'react-redux';
import { getOneServer } from '../../../store/server';
import { getAllChannelsByServerId, getChannel, loadChannel } from '../../../store/channel';
import EditServerFormModal from '../Forms/ServerForm/ServerFormModal';
import ServerDropDownMenu from './ServerDropDownMenu';
import { getChannelMessages } from '../../../store/message';

function Servers({ user, servers }) {
    const dispatch = useDispatch()

    // console.log('', '\n', '--------------SERVERS COMPONENT DATA--------------', '\n', currentServers, '\n', '')

    const oneServer = (serverId, channelId) => {
        dispatch(getAllChannelsByServerId(serverId))
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
            {servers && servers?.map((server) => (
                <div onClick={() => oneServer(server.id, server.channels[0]?.id)} key={server.id}>
                    <h2>{server.name}</h2>
                    <ImageWrapper as="img" src={server.serverImage} />
                    <ServerDropDownMenu />
                </div>
            ))}
        </ServerWrapper>
    )
}


export default Servers
