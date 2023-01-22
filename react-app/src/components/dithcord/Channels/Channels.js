import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import AddChannelFormModal from '../Forms/ChannelForm/Add/AddChannelFormModal';
import EditChannelFormModal from '../Forms/ChannelForm/Edit/EditChannelFormModal';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';
import { io } from 'socket.io-client'
import CurrentChannel from './CurrentChannel';

let socket;

function Channels({ channels }) {
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
    const currentChannel = useSelector(state => state.channels.oneChannel)
    const currentUser = useSelector(state => state.session.user)
    // const currentServerObj = useSelector(state => state.servers.oneServer)
    // const currentServer = Object.values(currentServerObj)

    console.log('===INSIDE OF CHANNELS COMPONENT===', currentChannel)
    
    const getOneChannel = (channelId) => {
        socket = io();
        // socket.emit("leave", { username: currentUser.username, room: currentChannel.id })
        if(channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
            // socket.emit("join", {user: currentUser.username, roomId: channelId})
        }
    }
    
    return (
        <div>
            <ServerDropDownMenu />
            {currentChannels && currentChannels.map((channel) => (
                <div key={channel.id}>
                    <div onClick={() => getOneChannel(channel.id)} key={channel.id}>
                        {/* {console.log('', '\n', '--------------CHANNELS COMPONENT DATA--------------', '\n', channel, '\n', '')} */}
                        <h2 key={channel.id}>{channel.name}</h2>
                    </div>
                    <div>
                        <EditChannelFormModal />
                        <DeleteChannelButton key={channel.id} channelId={channel.id}/>
                    </div>   
                </div> 
            ))}
            <AddChannelFormModal />
        </div>
    )
}


export default Channels
