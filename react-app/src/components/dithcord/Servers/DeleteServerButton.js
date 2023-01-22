import { useDispatch, useSelector } from "react-redux"
import { clearAllChannels } from "../../../store/channel";
import { clearMessages } from "../../../store/message";
import { deleteServer } from "../../../store/server";

const DeleteServerButton = ( server ) => {
    const dispatch = useDispatch();
    const currentServerObj = useSelector(state => state.servers.oneServer);
    const currentServer = Object.values(currentServerObj)
    const currentUser = useSelector(state => state.session.user);

    // console.log('=====================INSIDE OF DELETE SERVER BUTTON=========================', currentServer[0])

    const deleteServerButton = async (e) => {
        e.preventDefault();
        dispatch(clearMessages())
        dispatch(clearAllChannels())
        dispatch(deleteServer(currentServer[0].id)); 
    };

    return (
        <div>
            {currentUser.id === currentServer[0]?.ownerId && (
                <button onClick={deleteServerButton}>
                    Delete Server
                </button>
            )}
        </div>
    );
};

export default DeleteServerButton;
