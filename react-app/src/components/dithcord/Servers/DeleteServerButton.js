import { useDispatch, useSelector } from "react-redux"
import { clearAllChannels } from "../../../store/channel";
import { clearMessages } from "../../../store/message";
import { deleteServer } from "../../../store/server";
import styled from "styled-components";

const DeleteServerButton = () => {
    const dispatch = useDispatch();
    const currentServerObj = useSelector(state => state.servers.oneServer);
    const currentServer = Object.values(currentServerObj)
    const currentUser = useSelector(state => state.session.user);

    // console.log('=====================INSIDE OF DELETE SERVER BUTTON=========================', currentServer[0])

    const deleteServerButton = async (e) => {
        e.preventDefault();
        dispatch(clearMessages())
        dispatch(clearAllChannels())
        dispatch(deleteServer(currentServer[0].id)); 
    };

    return (
        <div>
            {currentUser.id === currentServer[0]?.ownerId && (
                <DropDownButton as="button" onClick={deleteServerButton}>
                    Delete Server
                </DropDownButton>
            )}
        </div>
    );
};

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

export default DeleteServerButton;
