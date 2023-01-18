import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getServers } from '../store/server';
import { getAllChannelsByServerId } from '../store/channel';
import { getChannelMessages } from '../store/message';

function Testing() {
    const dispatch = useDispatch()

    // const serversObj = useSelector(state => state.servers.allServers)              
    // const servers = Object.values(serversObj);

    // const serverChannelsObj = useSelector(state => state.channels.allChannels) 
    // const channels = Object.values(serverChannelsObj)

    const channel = useSelector(state => state.channels.oneChannel)

    const channelMessagesObj = useSelector(state => state.messages.channelMessages)
    const channelMessages = Object.values(channelMessagesObj)
    

    console.log('---Test Component---', channel)

    useEffect(() => {
        dispatch(getServers())
        dispatch(getAllChannelsByServerId(1))
        // dispatch(getChannel(3))
        // dispatch(newChannel(
        //     {
        //         "private": false,
        //         "name": "TESTING CREATION",
        //         "server_id": 1
        //     }
        // ));

        // dispatch(putChannel(1,
        //     {
        //         "private": true,
        //         "name": "TESTING EDIT",
        //         "server_id": 1
        //     }
        // ));

        // dispatch(destroyChannel(7));

        dispatch(getChannelMessages(1))

    }, [dispatch])


    return (
        <div>
            {/* {channels.map((server) => (
                <li key={server.id}>{server.name}</li>
            ))} */}

            {channelMessages.map((message) => (
                <li key={message.id}>{message.body}</li>
            ))}

            {/* <p>{channel.name}</p> */}
        </div>
    )
}

export default Testing
