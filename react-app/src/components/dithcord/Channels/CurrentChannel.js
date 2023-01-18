import React from 'react';
import ChannelMessages from '../Messages/ChannelMessages';
import { Wrapper } from '../DithcordStyles';

function CurrentChannel() {
    console.log('', '\n', '--------------CURRENT CHANNELS COMPONENT DATA--------------', '\n', '**DATA GOES HERE**', '\n', '')

    return (
        <Wrapper>
            <ChannelMessages />
        </Wrapper>
    )
}


export default CurrentChannel
