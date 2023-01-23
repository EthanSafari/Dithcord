import OpenModalButton from "../../../../OpenModalButton";
import AddChannelForm from './AddChannelForm'
import styled from "styled-components";

const AddChannelFormModal = () => {
    return (
        <OpenModalButton
            buttonText="New Channel"
            modalComponent={<AddChannelForm />}
        />
    );
};


export default AddChannelFormModal
