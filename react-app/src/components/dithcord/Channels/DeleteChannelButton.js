import { useDispatch, useSelector } from "react-redux"
import { destroyChannel } from "../../../store/channel";
import { clearMessages } from "../../../store/message";

const DeleteChannelButton = ({ channelId }) => {
    const dispatch = useDispatch();
    const currentServer = useSelector(state => state.servers.oneServer);
    const currentUser = useSelector(state => state.session.user);
    const currentChannel = useSelector(state => state.channels.oneChannel);

    const deleteChannelButton = async (e) => {
        e.preventDefault();
        dispatch(destroyChannel(channelId));
        dispatch(clearMessages())
    };

    // console.log('TESTING IN DELETE CHANNEL BUTTON: ',currentServer)

    return (
        <div>
            {currentUser.id === currentServer.ownerId && currentServer.id === currentChannel.server_id && (
                <button onClick={deleteChannelButton}>
                    Delete Channel
                </button>
            )}
        </div>
    );
};

export default DeleteChannelButton;
