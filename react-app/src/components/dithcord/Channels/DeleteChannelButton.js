import { useDispatch, useSelector } from "react-redux"
import { clearChannels, destroyChannel } from "../../../store/channel";
import { clearMessages } from "../../../store/message";

const DeleteChannelButton = ({ channelId }) => {
    const dispatch = useDispatch();
    const currentServerObj = useSelector(state => state.servers.oneServer);
    const currentServer = Object.values(currentServerObj)
    const currentUser = useSelector(state => state.session.user);
    const currentChannel = useSelector(state => state.channels.oneChannel);

    const deleteChannelButton = async (e) => {
        e.preventDefault();
        dispatch(clearMessages())
        dispatch(clearChannels())
        dispatch(destroyChannel(channelId));
    };

    return (
        <div>
            {currentUser.id === currentServer[0]?.ownerId && currentServer[0]?.id === currentChannel.server_id && (
                <button onClick={deleteChannelButton}>
                    Delete Channel
                </button>
            )}
        </div>
    );
};

export default DeleteChannelButton;
