import OpenModalButton from "../../../OpenModalButton";

const EditServerFormModal = () => {
    return (
        <OpenModalButton
            buttonText="Edit Server"
            modalComponent={<EditServerForm />}
        />
    );
};

export default EditServerFormModal
