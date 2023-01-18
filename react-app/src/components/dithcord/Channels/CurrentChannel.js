import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ChannelMessages from '../Messages/ChannelMessages';
import { Wrapper } from '../DithcordStyles';

function CurrentChannel() {


    return (
        <Wrapper>
            <ChannelMessages />
        </Wrapper>
    )
}


export default CurrentChannel
