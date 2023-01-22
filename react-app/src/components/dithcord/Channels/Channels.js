import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import AddChannelFormModal from '../Forms/ChannelForm/Add/AddChannelFormModal';
import EditChannelFormModal from '../Forms/ChannelForm/Edit/EditChannelFormModal';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';
import LogoutButton from '../../auth/LogoutButton';

function Channels({ channels }) {
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
    const currentServerObj = useSelector(state => state.servers.oneServer)
    const currentServer = Object.values(currentServerObj)
    const sessionUser = useSelector(state => state.session.user)

    // console.log('INSIDE OF CHANNELS COMPONENT', currentServer[0])

    const getOneChannel = (channelId) => {
        if (channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
            // socket.emit("join", {user: currentUser.username, roomId: channelId})
        }
    }

    return (
        <div className='channel-box'>
            <div>
                <div className='server-name'>
                    {currentServer && currentServer[0]?.name}
                </div>
                <ServerDropDownMenu />
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
                <AddChannelFormModal />
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
