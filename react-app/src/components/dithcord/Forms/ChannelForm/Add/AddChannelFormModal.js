import OpenModalButton from "../../../../OpenModalButton";
import AddChannelForm from './AddChannelForm'

const AddChannelFormModal = () => {
    return (
        <OpenModalButton
            buttonText="Add Channel"
            modalComponent={<AddChannelForm />}
        />
    );
};

export default AddChannelFormModal
