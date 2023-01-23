const LOAD_ALL_CHANNELS = 'channels/getAllChannels';
const LOAD_CHANNEL = 'channels/loadChannel';
const ADD_CHANNEL = 'channels/addChannel';
const EDIT_CHANNEL = 'channels/editChannel';
const DELETE_CHANNEL = 'channels/deleteChannel';
const CLEAR_CHANNELS = 'channels/clearChannels'
const CLEAR_ALL_CHANNELS = 'channels/clearAllChannels'

//------------------------------   ACTIONS   ------------------------------//

export const loadAllChannels = (channels) => {
    return {
        type: LOAD_ALL_CHANNELS,
        channels,
    };
};

export const loadChannel = (channel) => {
    return {
        type: LOAD_CHANNEL,
        channel,
    };
};

export const addChannel = (channel) => {
    return {
        type: ADD_CHANNEL,
        channel,
    };
};

export const editChannel = (channel) => {
    return {
        type: EDIT_CHANNEL,
        channel,
    };
};

export const deleteChannel = (channelId) => {
    return {
        type: DELETE_CHANNEL,
        channelId,
    };
};

export const clearChannels = (empty = {}) => {
    return {
        type: CLEAR_CHANNELS,
        empty
    }
}

export const clearAllChannels = (empty = {}) => {
    return {
        type: CLEAR_ALL_CHANNELS,
        empty
    }
}

//------------------------------   THUNKS   ------------------------------//

export const getAllChannelsByServerId = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}/channels`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadAllChannels(data));
    };
};

export const getChannel = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`);
    // console.log('----GET CHANNEL THUNK----', channelId) 
    if (res.ok) {
        const data = await res.json();
        dispatch(loadChannel(data));
        return data;
    };
};

export const newChannel = (channel) => async (dispatch) => {
    const res = await fetch('/api/channels/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(channel),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addChannel(data));
        return data;
    };
};

export const putChannel = (channelId, channel) => async (dispatch) => { //TODO consider removing channelId variable 
    const res = await fetch(`/api/channels/${channelId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(channel),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editChannel(data));
        return data;
    };
};

export const destroyChannel = (channelId, serverId) => async dispatch => {
    // console.log('---START THUNK DATA---', channelId) //TODO
    const res = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        // console.log('---THUNK DATA---' ) //TODO
        dispatch(deleteChannel(channelId));
        dispatch(getAllChannelsByServerId(serverId)); //TODO needs to be tested on frontend
        return { 'message' : 'Successfully Deleted' };
    };
};

//------------------------------   REDUCER   ------------------------------//

const initialState = { allChannels: {}, oneChannel: {} };
const channelReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_ALL_CHANNELS:
            {
                const newState = { allChannels: {}, oneChannel: {} };
                action.channels.channels.forEach(channel => {
                    newState.allChannels[channel.id] = channel
                });
                return newState;
            }

        case LOAD_CHANNEL:
            {
                const newState = { allChannels: {...state.allChannels}, oneChannel: {...state.oneChannel} };
                newState.oneChannel = action.channel;
                return newState;   
            }
            
        case ADD_CHANNEL:
            {
                const newState = { allChannels: {...state.allChannels}, oneChannel: {...state.oneChannel} };    
                newState.allChannels[action.channel.id] = action.channel;
                newState.oneChannel[action.channel.id] = action.channel;
                return newState;            
            }
            
        case EDIT_CHANNEL:
            {
                const newState = { allChannels: {...state.allChannels}, oneChannel: {...state.oneChannel} }; 
                newState.allChannels[action.channel.id] = action.channel;
                newState.oneChannel = action.channel;
                return newState;
            }
            
        case DELETE_CHANNEL:
            {
                // console.log('---REDUCER DATA---', action.channelId) //TODO
                const newState = { allChannels: {...state.allChannels}, oneChannel: {...state.oneChannel} }; 
                delete newState.oneChannel[action.channelId]
                delete newState.allChannels[action.channelId]
                return newState
            }
            
        case CLEAR_CHANNELS:
            {
                const newState = { allChannels: {...state.allChannels}, oneChannel: {}}
                return newState
            }
                
        case CLEAR_ALL_CHANNELS:
            {
                const newState = { allChannels: {}, oneChannel: {}}
                return newState
            }
            
        default:
            return state;
    }
}

export default channelReducer;
