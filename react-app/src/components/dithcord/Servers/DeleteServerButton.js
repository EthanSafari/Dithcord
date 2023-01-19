import { useDispatch, useSelector } from "react-redux"
import { deleteServer } from "../../../store/server";

const DeleteServerButton = () => {
    const dispatch = useDispatch();
    const currentServer = useSelector(state => state.servers.oneServer);
    const currentUser = useSelector(state => state.session.user);

    const deleteServerButton = async (e) => {
        e.preventDefault();
        await dispatch(deleteServer(currentServer.id));
    };

    return (
        <div>
            {currentUser.id === currentServer.ownerId && (
                <button onClick={deleteServerButton}>
                    Delete Server
                </button>
            )}
        </div>
    );
};

export default DeleteServerButton;
