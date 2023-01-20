import OpenModalButton from "../../../../OpenModalButton";
import EditServerForm from "./EditServerForm";

const EditServerFormModal = ({ server }) => {
    // console.log('EDIT SERVER FORM MODAL:  ', server)
    return (
        <OpenModalButton
            buttonText="Edit Server"
            modalComponent={<EditServerForm server={ server } />}
        />
    );
};

export default EditServerFormModal
