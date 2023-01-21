import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';
import { initiateSocket, disconnectSocket,
    subscribeToChat, sendMessage } from '../socket';
import io from 'socket.io-client'


const socket = io('http://localhost:5000')

function Channels({ channels }) {
    const rooms = Object.keys(channels)
    const [room, setRoom] = useState(rooms[0]);
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
    let roomNum;
    
    const getOneChannel = (channelId) => {
        if(channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
            console.log('', '\n', '--------------CHANNELS COMPONENT DATA--------------', '\n', rooms[rooms.indexOf(channelId.toString())], '\n', '')
            setRoom(rooms[rooms.indexOf(channelId.toString())])
            roomNum = room
        }
    }

    useEffect(() => {
        socket.emit("join", room)
        // subscribeToChat((err, data) => {
        //   if(err) return;
        // //   setChat(oldChats =>[data, ...oldChats])
        // });
        return () => {
          socket.disconnect()
        }
      }, [room]);
    
    return (
        <div>
            <ServerDropDownMenu />
            {currentChannels && currentChannels.map((channel) => (
                <div onClick={() => getOneChannel(channel.id)} key={channel.id}>
                    <h2>{channel.name}</h2>
                    <DeleteChannelButton channelId={channel.id} roomNum={roomNum}/>
                </div>
            ))}

        </div>
    )
}


export default Channels
