import React from 'react';
import { ServerWrapper, Wrapper, ImageWrapper, ServerImageWrapper } from '../DithcordStyles';
import { useDispatch } from 'react-redux';
import { getOneServer } from '../../../store/server';
import { getAllChannelsByServerId, getChannel, loadChannel } from '../../../store/channel';
import EditServerFormModal from '../Forms/ServerForm/ServerFormModal';
import ServerDropDownMenu from './ServerDropDownMenu';
import { clearMessages, getChannelMessages } from '../../../store/message';

function Servers({ user, servers }) {
    const dispatch = useDispatch()

    // console.log('', '\n', '--------------SERVERS COMPONENT DATA--------------', '\n', currentServers, '\n', '')

    const oneServer = (serverId, channelId) => {
        dispatch(clearMessages())
        if(serverId) {
            dispatch(getAllChannelsByServerId(serverId))
            dispatch(getOneServer(serverId))    
        }if(channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
        }else {
            dispatch(loadChannel({}))
        }
        return
    }

    return (
        <ServerWrapper>
            {servers && servers?.map((server) => (
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
