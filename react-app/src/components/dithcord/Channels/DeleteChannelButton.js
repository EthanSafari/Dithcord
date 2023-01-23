import { useDispatch, useSelector } from "react-redux"
import { clearChannels, destroyChannel } from "../../../store/channel";
import { clearMessages } from "../../../store/message";

import { ChannelButtons } from "../DithcordStyles";

const DeleteChannelButton = ({ channelId }) => {
    const dispatch = useDispatch();
    const currentServerObj = useSelector(state => state.servers.oneServer);
    const currentServer = Object.values(currentServerObj)
    const currentUser = useSelector(state => state.session.user);
    const currentChannel = useSelector(state => state.channels.oneChannel);

    // console.log('INSIDE DELETE CHANNEL BUTTON -----------------------------------------------', currentServer)

    const deleteChannelButton = async (e) => {
        e.preventDefault();
        dispatch(clearMessages())
        dispatch(clearChannels())
        dispatch(destroyChannel(channelId, currentServer[0]?.id));
    };

    return (
        <>
            {currentUser.id === currentServer[0]?.ownerId && currentServer[0]?.id === currentChannel.server_id && (
                <ChannelButtons as="button" onClick={deleteChannelButton}>
                    Del
                </ChannelButtons>
            )}
        </>
    );
};


export default DeleteChannelButton;
