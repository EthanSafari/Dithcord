import { useDispatch, useSelector } from "react-redux"
import { destroyChannel } from "../../../store/channel";

const DeleteChannelButton = ({ serverId, channel }) => {
    const dispatch = useDispatch();
    const currentServer = useSelector(state => state.servers.oneServer);
    const currentUser = useSelector(state => state.session.user);
    // const currentChannel = useSelector(state => state.channels.oneChannel);

    const deleteChannelButton = async (e) => {
        e.preventDefault();
        await dispatch(destroyChannel(channel.id, serverId));
    };

    return (
        <div>
            {currentUser.id === currentServer.ownerId && currentServer.id === channel.server_id && (
                <button onClick={deleteChannelButton}>
                    Delete Channel
                </button>
            )}
        </div>
    );
};

export default DeleteChannelButton;
