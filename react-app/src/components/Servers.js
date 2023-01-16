import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { getServers } from '../store/server';

function Servers() {
    const dispatch = useDispatch()

    const serversObj = useSelector(state => state.servers.allServers)
    const servers = Object.values(serversObj);

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    return (
        <div>
            {servers.map((server) => (
                <li>{server.name}</li>
            ))}
        </div>
    )
}

export default Servers
