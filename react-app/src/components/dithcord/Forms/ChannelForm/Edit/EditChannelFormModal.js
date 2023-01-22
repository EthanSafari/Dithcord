import OpenModalButton from "../../../../OpenModalButton";
import EditChannelForm from "./EditChannelForm";

const EditChannelFormModal = ({ server }) => {
    // console.log('EDIT SERVER FORM MODAL:  ', server)
    return (
        <OpenModalButton
            buttonText="Edit Channel"
            modalComponent={<EditChannelForm server={ server } />}
        />
    );
};

export default EditChannelFormModal
