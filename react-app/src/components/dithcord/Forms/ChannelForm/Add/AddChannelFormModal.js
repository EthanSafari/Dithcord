import OpenModalButton from "../../../../OpenModalButton";
import AddChannelForm from './AddChannelForm'
import styled from "styled-components";
import DropDownModalButton from "../../../../OpenModalButton/DropDownModalButton";

const AddChannelFormModal = () => {
    return (
        <DropDownModalButton
            buttonText="New Channel"
            modalComponent={<AddChannelForm />}
        />
    );
};


export default AddChannelFormModal
