import { useDispatch, useSelector } from "react-redux"
import { clearAllChannels } from "../../../store/channel";
import { clearMessages } from "../../../store/message";
import { deleteServer } from "../../../store/server";

const DeleteServerButton = ( server ) => {
    const dispatch = useDispatch();
    const currentServer = useSelector(state => state.servers.oneServer[1]);
    const currentUser = useSelector(state => state.session.user);

    console.log('INSIDE OF SERVER BUTTON', currentServer)

    const deleteServerButton = async (e) => {
        e.preventDefault();
        dispatch(clearMessages())
        dispatch(clearAllChannels())
        dispatch(deleteServer(currentServer.id));
    };

    return (
        <div>
            {currentUser.id === currentServer?.ownerId && (
                <button onClick={deleteServerButton}>
                    Delete Server
                </button>
            )}
        </div>
    );
};

export default DeleteServerButton;
