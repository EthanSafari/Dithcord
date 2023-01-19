import React from 'react';
import { useDispatch } from 'react-redux';
import { getChannel } from '../../../store/channel';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';

function Channels({ channels }) {
    const dispatch = useDispatch();
    const serverChannels = channels
    // console.log('', '\n', '--------------CHANNELS COMPONENT DATA--------------', '\n', serverChannels, '\n', '')

    const getOneChannel = (channelId) => {
        return dispatch(getChannel(channelId))
    }
    
    return (
        <div>
            <ServerDropDownMenu />
            {serverChannels && serverChannels.map((channel) => (
                <div onClick={() => getOneChannel(channel.id)} key={channel.id}>
                    <h2>{channel.name}</h2>
                </div>
            ))}

        </div>
    )
}


export default Channels
