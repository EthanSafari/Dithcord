import OpenModalButton from "../../../../OpenModalButton";
import EditServerForm from "./EditServerForm";
import { useSelector } from "react-redux";
import DropDownModalButton from "../../../../OpenModalButton/DropDownModalButton";

const EditServerFormModal = ({ server }) => {
    // console.log('EDIT SERVER FORM MODAL:  ', server)
    const currentServerObj = useSelector(state => state.servers.oneServer);
    const currentServer = Object.values(currentServerObj)
    const currentUser = useSelector(state => state.session.user);

    return (
        <>
            {currentUser.id === currentServer[0]?.ownerId && (
                <DropDownModalButton
                    buttonText="Edit Server"
                    modalComponent=<EditServerForm server={ server }/>
                />
            )}
        </>
    );
};

export default EditServerFormModal
