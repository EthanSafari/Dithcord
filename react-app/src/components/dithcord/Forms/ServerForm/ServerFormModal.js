import OpenModalButton from "../../../OpenModalButton";

const EditServerFormModal = () => {
    return (
        <OpenModalButton
            buttonText="Edit Server"
            modalComponent={<LoginForm />}
        />
    );
};

export default EditServerFormModal
