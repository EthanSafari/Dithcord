import OpenModalButton from "../../../../OpenModalButton";
import NewServerForm from "../Add/NewServerForm"

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
