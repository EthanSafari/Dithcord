import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Wrapper } from './DithcordStyles';
import PrivateMessaging from './Messages/PrivateMessages'
import Servers from './Servers/Servers'
import CurrentServer from './Servers/CurrentServer'
import { getAllServersByUserId } from '../../store/server';
import UsersList from '../UsersList';


function Dithcord() {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);
    const currentServerObj = useSelector(state => state.servers.oneServer);
    const currentServer = Object.values(currentServerObj)

    const userServersObj = useSelector(state => state.servers.allServers);
    const userServers = Object.values(userServersObj)

    // console.log('', '\n', '--------------MAIN COMPONENT DATA--------------', '\n', userServers, '\n', '');

    useEffect(() => {
        // dispatch(getServers())
        dispatch(getAllServersByUserId(currentUser.id))
    }, [dispatch, currentServer.id, currentUser.id]);

    return(
        <Wrapper>
            <PrivateMessaging />
            <Servers user={currentUser} servers={userServers} />
            <CurrentServer server={currentServer}/>
            <UsersList />
        </Wrapper>
    )

}


export default Dithcord
