import { editServer } from "./server"

// const LOAD_MESSAGES = 'messages/load'
const LOAD_ONE_MESSAGE = 'messages/loadOne'
const LOAD_CHANNEL_MESSAGES = 'messages/loadChannelMessages'
const ADD_MESSAGE = 'messages/add'
const EDIT_MESSAGE = 'messages/edit'
const DELETE_MESSAGE = 'messages/delete'


//------------------------------   ACTIONS   ------------------------------//

export const loadOneMessage = (message) => {
    return {
        type: LOAD_ONE_MESSAGE,
        message
    }
}

export const loadChannelMessages = (messages) => {
    // console.log('---ACTION DATA---', messages) //TODO
    return {
        type: LOAD_CHANNEL_MESSAGES,
        messages
    }
}

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

export const editMessage = (message) => {
    return {
        type: EDIT_MESSAGE,
        message
    }
}

export const removeMessage = (messageId) => {
    return {
        type: DELETE_MESSAGE,
        messageId
    }
}


//------------------------------   THUNKS   ------------------------------//

export const getOneMessage = (messageId) => async (dispatch) => {
    const res = await fetch(`/api/messages/${messageId}`)

    if(res.ok) {
        const data = await res.json();
        dispatch(loadOneMessage(data))
    }
}

export const getChannelMessages = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/messages`)

    if(res.ok) {
        const data = await res.json();
        // console.log('---THUNK DATA---', data ) //TODO
        dispatch(loadChannelMessages(data))
    }
}

export const createMessage = (message) => async (dispatch) => {
    const { body, channelId, authorId } = message;

    const res = await fetch('/api/messages/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(message)
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(addMessage(data))
    }
}

export const deleteMessage = (messageId) => async (dispatch) => {
    const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(removeMessage(messageId))
    }
}

export const editMessageById = (message) => async (dispatch) => {
    const { id, body, channelId, authorId } = message
    const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id,
            body,
            channelId,
            authorId
        })
    })
    if(res.ok) {
        const data = await res.json();
        dispatch(editServer(data))
    }
}


//------------------------------   REDUCER   ------------------------------//

const initialState = { channelMessages: {}, oneMessage: {} }
const messageReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOAD_ONE_MESSAGE:
            {
                const newState = { channelMessages: {...state.channelMessages}, oneMessage: {...state.oneMessage}}
                newState.oneMessage = {...action.message};
                return newState;
            }

        case LOAD_CHANNEL_MESSAGES:
            {
                // console.log('---REDUCER DATA---', action.messages.messages) //TODO
                const newState = { channelMessages: {...state.channelMessages}, oneMessage: {...state.oneMessage}}
                action.messages.messages.forEach(message => {
                    newState.channelMessages[message.id] = message;
                })
                return newState
            }

        case ADD_MESSAGE:
            {
                const newState = { channelMessages: {...state.channelMessages}, oneMessage: {...state.oneMessage}}
                newState.channelMessages[action.server.id] = action.message
                return newState
            }

        case EDIT_MESSAGE:
            {
                const newState = { channelMessages: {...state.channelMessages}, oneMessage: {...state.oneMessage}}
                newState.channelMessages[action.message.id] = action.message
                newState.oneMessage = action.message
                return newState
            }

        case DELETE_MESSAGE:
            {
                const newState = { channelMessages: {...state.channelMessages}, oneMessage: {...state.oneMessage}}
                delete newState.channelMessages[action.messageId]
                delete newState.oneMessage[action.messageId]
                return newState
            }

        default:
            return state
    }
}

export default messageReducer
