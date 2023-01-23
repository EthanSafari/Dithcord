import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    /* background-color: rgba(107, 107, 107); */
`;

export const ServerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 5%;
    max-width: 70px;
    align-items: center;
    padding: 1rem;
    background-color: rgba(10, 10, 10, 0.8);
`;

export const ImageWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    object-fit: cover;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin: .3rem 1rem;
    cursor: pointer;
    &:hover {
        border-radius: 30%;
    }
`;

export const MessageContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: rgba(44, 44, 44, 1)
`;

/* export const ServerImageWrapper = styled.div`

`; */

export const TopPartMessage = styled.div`
    display: flex;
    width: 98%;
    justify-content: space-between;
    padding: 1% 1%;
    border-top: 1px solid black;
`;

export const ServerOptions = styled.div`
    display: flex;
    width: 96%;
    justify-content: center;
    align-items: center;
    border-top: 1px solid grey;
    padding: 2%;
    &:hover {
        background-color: grey;
    }
`;

export const ServerOptionsButtons = styled.button`
    border: none;
    background-color: transparent;
`;

export const ChannelButtons = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 25px;
    padding: 0px 10px;
    border-radius: 10px;
    background-color: rgba(100, 100, 100, 1);
    border: none;
    &:hover {
        background-color: rgba(89, 89, 89, 1);
    }
`;

export const ServerDropDownMenu = styled.div`
    position: absolute;
    z-index: 1;
`;

export const DropDownButton = styled.button`
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
`;
