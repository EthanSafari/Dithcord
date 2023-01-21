import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import AddChannelFormModal from '../Forms/ChannelForm/Add/AddChannelFormModal';
import EditChannelFormModal from '../Forms/ChannelForm/Edit/EditChannelFormModal';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';
import { io } from 'socket.io-client';

let socket;
function Channels({ channels }) {
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
    const user = useSelector(state => state.session.user)
    // const currChannel = useSelector(state => state.channel)

    // const currentServerObj = useSelector(state => state.servers.oneServer)
    // const currentServer = Object.values(currentServerObj)

    // console.log('INSIDE OF CHANNELS COMPONENT', currentServer[0]?.id)
    // const joinRoom = (channelId) => useEffect(() => {
    //     socket = io();
    //     socket.emit('join', { "user": user, 'room': channelId })
    //     return (() => {
    //         socket.disconnect()
    //       })
    // }, [channelId])
    
    const getOneChannel = (channelId) => {
        if(channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
        }
    }

    // const handleClick = (channelId) => {
    //     joinRoom(channelId)
    //     getOneChannel(channelId)
    // }
    
    return (
        <div>
            <ServerDropDownMenu />
            {currentChannels && currentChannels.map((channel) => (
                <div key={channel.id}>
                    <div onClick={() =>getOneChannel()} key={channel.id}>
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
