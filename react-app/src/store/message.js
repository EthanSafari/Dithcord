import { editServer } from "./server"

const LOAD_MESSAGES = 'messages/load'
const LOAD_ONE_MESSAGE = 'messages/loadOne'
const ADD_MESSAGE = 'messages/add'
const EDIT_MESSAGE = 'messages/edit'
const DELETE_MESSAGE = 'messages/delete'


//------------------------------   ACTIONS   ------------------------------//

export const loadMessages = (messages) => {
    return {
        type: LOAD_MESSAGES,
        messages
    }
}

export const loadOneMessage = (message) => {
    return {
        type: LOAD_ONE_MESSAGE,
        message
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

export const getMessages = () => async (dispatch) => {
    const res = await fetch('/api/messages', {
        headers: {
            'Content-Type': 'application/json'
          }
    });

    if(res.ok){
        const data = await res.json();
        console.log('response data: ', data)
        dispatch(loadMessages(data.servers))
    }
}

export const getOneMessage = (messageId) => async (dispatch) => {
    const res = await fetch(`/api/messages/${messageId}`)

    if(res.ok){
        const data = await res.json();
        dispatch(loadOneMessage(data))
    }
}

export const createMessage = (message) => async (dispatch) => {
    const { body, channelId, authorId } = message;

    const res = await fetch('/api/messages/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            body,
            channelId,
            authorId
        })
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

const initialState = { allMessages: {}, oneMessage: {} }
const messageReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOAD_MESSAGES:
            {
                const newState = { allMessages: {...state.allMessages}, oneMessage: {}}
                action.messages.forEach(message => {
                    newState.allMessages[message.id] = message;
                });
                return newState;
            }

        case LOAD_ONE_MESSAGE:
            {
                const newState = { allMessages: {...state.allMessages}, oneMessage: {...state.oneMessage}}
                newState.oneMessage = {...action.message};
                return newState;
            }

        case ADD_MESSAGE:
            {
                const newState = { allMessages: {...state.allMessages}, oneMessage: {...state.oneMessage}}
                newState.allMessages[action.server.id] = action.message
                return newState
            }

        case EDIT_MESSAGE:
            {
                const newState = { allMessages: {...state.allMessages}, oneMessage: {...state.oneMessage}}
                newState.allMessages[action.message.id] = action.message
                newState.oneMessage = action.message
                return newState
            }

        case DELETE_MESSAGE:
            {
                const newState = { allMessages: {...state.allMessages}, oneMessage: {...state.oneMessage}}
                delete newState.allMessages[action.messageId]
                delete newState.oneMessage[action.messageId]
                return newState
            }

        default:
            return state
    }
}

export default messageReducer
