import { useDispatch, useSelector } from "react-redux"
import { destroyChannel } from "../../../store/channel";
import { deleteServer } from "../../../store/server";

const DeleteChannelButton = () => {
    const dispatch = useDispatch();
    const currentServer = useSelector(state => state.servers.oneServer);
    const currentUser = useSelector(state => state.session.user);
    const currentChannel = useSelector(state => state.channels.oneChannel);

    const deleteChannelButton = async (e) => {
        e.preventdefault();
        await dispatch(destroyChannel(currentChannel.id));
    };

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
