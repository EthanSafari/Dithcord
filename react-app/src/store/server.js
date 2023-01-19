

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
    const res = await fetch('/api/servers', {
        headers: {
            'Content-Type': 'application/json'
          }
    });

    if(res.ok){
        const data = await res.json();
        dispatch(loadServers(data.servers))
    }
}

export const getOneServer = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`)

    if(res.ok){
        const data = await res.json();
        dispatch(loadOneServer(data))
        return data
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

export const editServerById = (server) => async (dispatch) => {
    console.log('EDITING SERVER THUNK DATA: ', server)
    const res = await fetch(`/api/servers/${server.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(server)
    })
    if(res.ok) {
        const data = await res.json();
        console.log('IN THUNK --res data-- : ', data)
        dispatch(editServer(data))
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
                newState.oneServer = {...action.server};
                return newState;
            }

        case ADD_SERVER:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {...state.oneServer}}
                newState.allServers[action.server.id] = action.server
                return newState
            }

        case EDIT_SERVER:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {...state.oneServer}}
                console.log('INSIDE REDUCER:  ', action.server)
                newState.allServers[action.server.id] = action.server
                newState.oneServer = action.server
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
