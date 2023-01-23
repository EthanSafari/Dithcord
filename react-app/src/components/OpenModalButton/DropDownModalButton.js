import React from 'react';
import { useModal } from '../../context/Modal';
import styled from 'styled-components';

function DropDownModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === 'function') onButtonClick();
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <DropDownButton as="button" onClick={onClick}>{buttonText}</DropDownButton>
  );
}

const DropDownButton = styled.button`
    box-sizing: border-box;
    display: flex;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    color: white;
    width: 100%;
    height: 20px;
    border: none;
    &:hover{
        background-color: grey;
    }
`

export default DropDownModalButton;
