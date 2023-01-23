import OpenModalButton from "../../../../OpenModalButton";
import EditChannelForm from "./EditChannelForm";
import ChannelsModalButton from "../../../../OpenModalButton/ChannelsModalButton";

const EditChannelFormModal = ({ server }) => {
    // console.log('EDIT SERVER FORM MODAL:  ', server)
    return (
        <ChannelsModalButton
            buttonText="Edit"
            modalComponent={<EditChannelForm server={ server } />}
        />
    );
};

export default EditChannelFormModal
