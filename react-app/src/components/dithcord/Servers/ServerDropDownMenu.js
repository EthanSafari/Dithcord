import DeleteServerButton from './DeleteServerButton'
import EditServerFormModal from '../Forms/ServerForm/Edit/EditServerFormModal'
import { useSelector } from "react-redux";
import { useState } from 'react';
import AddChannelFormModal from '../Forms/ChannelForm/Add/AddChannelFormModal';
import { ServerOptions } from '../DithcordStyles';
import styled from 'styled-components';


const ServerDropDownMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const serverObj = useSelector(state => state.servers.oneServer);
    const server = Object.values(serverObj)[0];
    const sessionUser = useSelector(state => state.session.user);

    // console.log('=========INSIDE OF SERVER DROP DOWN========', currentServer?.ownerId)

    if (server && (sessionUser.id !== server.ownerId)) return null;
    if (!server) return null;
    return (
        <div>

            <ServerOptions>

                <button onClick={() => {
                    setShowMenu(!showMenu)}}
                    className='server-option-button'>Server Options</button>
                        </ServerOptions>
        {showMenu && (
            <DropDownWrapper>
                <EditServerFormModal server={server} />
                <DeleteServerButton server={server} />
                <AddChannelFormModal />
            </DropDownWrapper>
        )}
        </div>
    )
}

const DropDownWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`


export default ServerDropDownMenu
