import OpenModalButton from "../../../OpenModalButton";

const EditChannelFormModal = () => {
    return (
        <OpenModalButton
            buttonText="Edit Channel"
            modalComponent={<EditChannelForm />}
        />
    );
};

export default EditChannelFormModal
