import { useDispatch, useSelector } from "react-redux"
import { deleteMessage } from "../../../store/message";


const DeleteMessageButton = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const currentMessage = useSelector(state => state.messages.oneMessage);

    const deleteMessageButton = async (e) => {
        e.preventDefault();
        await dispatch(deleteMessage(currentMessage.id));
    };

    return (
        <div>
            {currentUser.id === currentMessage.authorId && (
                <button onClick={deleteMessageButton}>
                    Delete Message
                </button>
            )}
        </div>
    );
};

export default DeleteMessageButton;
