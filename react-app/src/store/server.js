

const LOAD_SERVERS = 'servers/load'
const LOAD_ONE_SERVER = 'server/loadOne'
const ADD_SERVER = 'server/add'
const EDIT_SERVER = 'server/edit'
const DELETE_SERVER = 'server/delete'



//------------------------------   ACTIONS   ------------------------------//

export const loadServers = (servers) => {
    return {
        type: LOAD_SERVERS,
        servers
    }
}

export const loadOneServer = (server) => {
    return {
        type: LOAD_ONE_SERVER,
        server
    }
}

export const addServer = (server) => {
    return {
        type: ADD_SERVER,
        server
    }
}

export const editServer = (server) => {
    return {
        type: EDIT_SERVER,
        server
    }
}

export const removeServer = (serverId) => {
    return {
        type: DELETE_SERVER,
        serverId
    }
}



//------------------------------   THUNKS   ------------------------------//

export const getServers = () => async (dispatch) => {
    const res = await fetch('/api/servers');

    if(res.ok){
        const data = await res.json();
        dispatch(loadServers(data.Servers))
    }
}

export const getOneServer = (serverId) => async (dispatch) => {
    const res = await fetch(`api/servers/${serverId}`)

    if(res.ok){
        const data = await res.json();
        dispatch(loadOneServer(data))
    }
}

export const createServer = (server) => async (dispatch) => {
    const {name, privateStatus, serverImage} = server;

    const res = await fetch('/api/servers/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            privateStatus,
            serverImage
        })
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(addServer(data))
    }
}

export const deleteServer = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(removeServer(serverId))
    }
}



//------------------------------   REDUCER   ------------------------------//

const initialState = { allServers: {}, oneServer: {} }
const serverReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOAD_SERVERS:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {}}
                action.servers.forEach(server => {
                    newState.allServers[server.id] = server;
                });
                return newState;
            }

        case LOAD_ONE_SERVER:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {...state.oneServer}}
                newState.oneServer = {...action.Server};
                return newState;
            }

        case ADD_SERVER:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {...state.oneServer}}
                newState.allServers[action.server.id] = action.server
                return newState
            }

        case DELETE_SERVER:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {...state.oneServer}}
                delete newState.allServers[action.serverId]
                delete newState.oneServer[action.serverId]
                return newState
            }

        default:
            return state
    }
}

export default serverReducer
