import OpenModalButton from "../../../OpenModalButton";
import NewServerForm from "./EditServerForm";

const NewServerFormModal = () => {
    // console.log('EDIT SERVER FORM MODAL:  ', server)
    return (
        <OpenModalButton
            buttonText="New Server"
            modalComponent={<NewServerForm />}
        />
    );
};

export default NewServerFormModal
