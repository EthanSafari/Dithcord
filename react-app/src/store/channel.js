const LOAD_CHANNEL = 'channels/loadOne';
const ADD_CHANNEL = 'channels/add';
const EDIT_CHANNEL = 'channels/edit';
const DELETE_CHANNEL = 'channels/delete';

//------------------------------   ACTIONS   ------------------------------//

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

//------------------------------   THUNKS   ------------------------------//

export const getChannel = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`);
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

export const putChannel = (channelId, channel) => async (dispatch) => {
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

export const destroyChannel = (channelId) => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteChannel(channelId));
        return { 'message' : 'Successfully Deleted' };
    };
};

//------------------------------   REDUCER   ------------------------------//

const initialState = { channel: {} };
const channelReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_CHANNEL:
            newState = { ...state.channel };
            newState.channel[action.channel.id] = { ...action.channel };
            return newState;
        case ADD_CHANNEL:
            newState = { ...state.channel };
            newState.channel[action.channel.id] = { ...action.channel };
            return newState;
        case EDIT_CHANNEL:
            newState = { ...state.channel };
            newState.channel[action.channel.id] = { ...action.channel };
            return newState;
        case DELETE_CHANNEL:
            newState = { ...state.channel };
            delete newState.channel[action.channelId];
            return newState;
        default:
            return state;
    }
}

export default channelReducer;
