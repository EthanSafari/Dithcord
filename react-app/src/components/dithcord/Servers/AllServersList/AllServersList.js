import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServersByUserId } from '../../../../store/server';

const AllServersList = () => {

    const [servers, setServers] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    console.log(sessionUser.servers)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/servers');
            const responseData = await response.json();
            setServers(responseData.servers);
        };
        fetchData();
    }, []);

    const addServer = async (userId, serverId) => {
        const sessionUserSessions = await fetch(`/api/users/${userId}/servers`);
        const sessionUserSessionsData = await sessionUserSessions.json();
        console.log('DATA', sessionUserSessionsData)
        if (sessionUser.servers.length === 0 || !sessionUserSessionsData.userServers.find(server => server.id === serverId)) {
            const joinServer = await fetch(`/api/users/${userId}/servers/${serverId}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            await dispatch(getAllServersByUserId(userId));
        } else {
            await dispatch(getAllServersByUserId(userId));
        }
    }

    return (
        <div>
            {servers.map(server => (
                <div onClick={() => addServer(sessionUser.id, server.id)}>
                    {/* <img src={server.serverImage} /> */}
                    {server.name}
                </div>
            ))}
        </div>
    )
}

export default AllServersList;
