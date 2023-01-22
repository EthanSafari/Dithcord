import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageWrapper, MessageContainerWrapper, TopPartMessage } from '../DithcordStyles';
import DeleteMessageButton from './DeleteMessageButton';

import MessageForm from './MessageForm'
import { getChannelMessages } from '../../../store/message';

import Chat from '../LiveChat/Chat'


function ChannelMessages({ messages, channelId }) {
    const channelMessages = messages

    // console.log('', '\n', '--------------CHANNEL MESSAGES COMPONENT DATA--------------', '\n', channelMessages, '\n', '')

    return (
        <Chat />
    )
}

export default ChannelMessages
