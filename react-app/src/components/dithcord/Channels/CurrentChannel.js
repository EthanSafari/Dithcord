import React from 'react';
import ChannelMessages from '../Messages/ChannelMessages';
import { Wrapper } from '../DithcordStyles';

function CurrentChannel() {
    console.log('--------------CURRENT CHANNEL COMPONENT--------------\n')

    return (
        <Wrapper>
            <ChannelMessages />
        </Wrapper>
    )
}


export default CurrentChannel
