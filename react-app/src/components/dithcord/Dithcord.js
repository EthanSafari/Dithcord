import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components';

import Servers from './Servers'

function Dithcord() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    console.log(sessionUser)

    const Wrapper = styled.section`
        display: flex;
        flex-direction: row;
    `;

    return(
        <Wrapper>
            {/* {sessionUser.servers.map((server) => (
                <p>{server.name}</p>
            ))} */}
            <Servers />
        </Wrapper>
    )

}


export default Dithcord
