import DeleteServerButton from './DeleteServerButton'
import EditServerFormModal from '../Forms/ServerForm/Edit/EditServerFormModal'
import { useSelector } from "react-redux";
import { useState } from 'react';
import AddChannelFormModal from '../Forms/ChannelForm/Add/AddChannelFormModal';
import { ServerOptions } from '../DithcordStyles';


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
            <div>
                <EditServerFormModal server={server} />
                <DeleteServerButton server={server} />
                <AddChannelFormModal />
            </div>
        )}
        </div>
    )
}


export default ServerDropDownMenu
