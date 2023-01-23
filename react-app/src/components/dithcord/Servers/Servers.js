import React from 'react';
import { ServerWrapper, ImageWrapper, ServerImageWrapper } from '../DithcordStyles';
import { useDispatch } from 'react-redux';
import { getOneServer } from '../../../store/server';
import { getAllChannelsByServerId, getChannel, loadChannel } from '../../../store/channel';
import { clearMessages, getChannelMessages } from '../../../store/message';
import NewServerFormModal from '../Forms/ServerForm/Add/NewServerFormModal'
import AllServersModal from './AllServersList';

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
            <AllServersModal />
            <NewServerFormModal />
            {servers && servers?.map((server) => (
                <div onClick={() => oneServer(server.id, server.channels[0]?.id)} key={server.id}>
                    {/* <h2>{server.name}</h2> */}
                        {server.serverImage.length === 3 ? (
                            <ImageWrapper>
                                <div className='private-server-imagename'>
                                {server.serverImage}
                                </div>
                            </ImageWrapper>
                        ) : (
                    <ImageWrapper as="img" src={server.serverImage} />
                        )}
                </div>
            ))}
        </ServerWrapper>
    )
}


export default Servers
