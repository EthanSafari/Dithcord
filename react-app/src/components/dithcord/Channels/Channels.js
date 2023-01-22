import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import AddChannelFormModal from '../Forms/ChannelForm/Add/AddChannelFormModal';
import EditChannelFormModal from '../Forms/ChannelForm/Edit/EditChannelFormModal';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';
<<<<<<< HEAD
import { io } from 'socket.io-client'
import CurrentChannel from './CurrentChannel';

let socket;
=======
import LogoutButton from '../../auth/LogoutButton';
>>>>>>> origin/styling-website

function Channels({ channels }) {
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
<<<<<<< HEAD
    const currentChannel = useSelector(state => state.channels.oneChannel)
    const currentUser = useSelector(state => state.session.user)
    // const currentServerObj = useSelector(state => state.servers.oneServer)
    // const currentServer = Object.values(currentServerObj)

    console.log('===INSIDE OF CHANNELS COMPONENT===', currentChannel)
    
    const getOneChannel = (channelId) => {
        socket = io();
        // socket.emit("leave", { username: currentUser.username, room: currentChannel.id })
        if(channelId) {
=======
    const currentServerObj = useSelector(state => state.servers.oneServer)
    const currentServer = Object.values(currentServerObj)
    const sessionUser = useSelector(state => state.session.user)

    console.log(currentServerObj)
    // console.log('INSIDE OF CHANNELS COMPONENT', currentServer[0]?.id)

    const getOneChannel = (channelId) => {
        if (channelId) {
>>>>>>> origin/styling-website
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
            // socket.emit("join", {user: currentUser.username, roomId: channelId})
        }
    }

    return (
        <div className='channel-box'>
            <div>
                <div className='server-name'>
                    {currentServer[0]?.name}
                </div>
                <ServerDropDownMenu />
                <AddChannelFormModal />
            </div>
            <div className='channels-container'>
                {currentChannels && currentChannels.map((channel) => (
                    <div key={channel.id} className='channel-and-channel-options'>
                        <div onClick={() => getOneChannel(channel.id)} key={channel.id}>
                            {/* {console.log('', '\n', '--------------CHANNELS COMPONENT DATA--------------', '\n', channel, '\n', '')} */}
                            <h2 key={channel.id}>{channel.name}</h2>
                        </div>
                        <div>
                            <EditChannelFormModal />
                            <DeleteChannelButton key={channel.id} channelId={channel.id} />
                        </div>
                    </div>
                ))}
            </div>
            <div className='user-info'>
                <div>
                    <img src={sessionUser.profile_img} alt={sessionUser.username} />
                    {sessionUser.username}
                </div>
                    <LogoutButton />
            </div>
        </div>
    )
}


export default Channels
