import OpenModalButton from "../../../../OpenModalButton";
import EditServerForm from "./EditServerForm";
import { useSelector } from "react-redux";

const EditServerFormModal = ({ server }) => {
    // console.log('EDIT SERVER FORM MODAL:  ', server)
    const currentServerObj = useSelector(state => state.servers.oneServer);
    const currentServer = Object.values(currentServerObj)
    const currentUser = useSelector(state => state.session.user);

    return (
        <>
            {currentUser.id === currentServer[0]?.ownerId && (
                <OpenModalButton
                    buttonText="Edit Server"
                    modalComponent=<EditServerForm server={ server }/>
                />
            )}
        </>
    );
};

export default EditServerFormModal
