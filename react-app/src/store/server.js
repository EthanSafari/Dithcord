

const LOAD_SERVERS = 'servers/load'
const LOAD_ONE_SERVER = 'server/loadOne'
const LOAD_USER_SERVERS = 'servers/loadUserServers'
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

export const loadUserServers = (servers) => {
    return {
        type: LOAD_USER_SERVERS,
        servers
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

export const getAllServersByUserId = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/servers`)

    if(res.ok) {
        const data = await res.json();
        dispatch(loadUserServers(data))
        return data
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
    // const {name, private, serverImage} = server;
    const res = await fetch('/api/servers/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(server)
    })
    if (res.ok) {
        const data = await res.json();
        const addGeneralChat = await fetch('/api/channels/new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                private: false,
                name: 'General',
                server_id: data.id,
            }),
        });
        if (addGeneralChat.ok) {
            const userServerAdd = await fetch(`/api/users/${data.ownerId}/servers/${data.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            if (userServerAdd.ok){
                dispatch(addServer(data));
                return data;
            }
        }
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


export const createPrivateServerAndChat = (user1, user2) => async (dispatch) => {
    const serverRes = await fetch('/api/servers/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            private: true,
            name: `${user1.username} & ${user2.username}`,
            server_image: `${user1.username[0].toUpperCase()}&${user2.username[0].toUpperCase()}`,
            owner_id: user1.id
        })
    })
    if (serverRes.ok) {
        const serverData = await serverRes.json();
        const addPrivateChat = await fetch('/api/channels/new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                private: true,
                name: `Private Chat`,
                server_id: serverData.id,
            }),
        });
        if (addPrivateChat.ok) {
            const user1PrivateServerAdd = await fetch(`/api/users/${user1.id}/servers/${serverData.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            const user2PrivateServerAdd = await fetch(`/api/users/${user2.id}/servers/${serverData.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            if (user1PrivateServerAdd && user2PrivateServerAdd) {
                dispatch(addServer(serverData));
                return serverData;
            }
        }
    }
}


//------------------------------   REDUCER   ------------------------------//

const initialState = { allServers: {}, oneServer: {} }
const serverReducer = (state = initialState, action) => {
    switch(action.type) {

        // case LOAD_SERVERS:
        //     {
        //         const newState = { allServers: {...state.allServers}, oneServer: {}}
        //         action.servers.forEach(server => {
        //             newState.allServers[server.id] = server;
        //         });
        //         return newState;
        //     }

        case LOAD_ONE_SERVER:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {}}
                newState.oneServer[action.server.id] = action.server
                return newState;
            }

        case LOAD_USER_SERVERS:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {}}
                action.servers.userServers.forEach(server => {
                    newState.allServers[server.id] = server;
                });
                return newState;
            }

        case ADD_SERVER:
            {
                console.log('inside of ADD SERVER: ', action.server)
                const newState = { allServers: {...state.allServers}, oneServer: {...state.oneServer}}
                newState.allServers[action.server.id] = action.server
                return newState
            }

        case EDIT_SERVER:
            {
                const newState = { allServers: {...state.allServers}, oneServer: {...state.oneServer}}
                console.log('INSIDE REDUCER:  ', action.server)
                newState.allServers[action.server.id] = action.server
                newState.oneServer[action.server.id] = action.server
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
