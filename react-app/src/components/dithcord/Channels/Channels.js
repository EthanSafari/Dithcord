import React from 'react';
import { useDispatch } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';

function Channels({ channels }) {
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
    
    const getOneChannel = (channelId) => {
        if(channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
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
                        <DeleteChannelButton key={channel.id} channelId={channel.id}/>
                    </div>   
                </div> 
            ))}

        </div>
    )
}


export default Channels
