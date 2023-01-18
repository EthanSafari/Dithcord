import OpenModalButton from "../../../OpenModalButton";

const EditChannelFormModal = () => {
    return (
        <OpenModalButton
            buttonText="Edit Channel"
            modalComponent={<ChannelForm />}
        />
    );
};

export default EditChannelFormModal
