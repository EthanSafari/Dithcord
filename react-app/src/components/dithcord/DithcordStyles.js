import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-height: 100vh;
`;

export const ServerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 5%;
    max-width: 70px;
    border: 1px solid black;
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
    border: 2px solid black;
    border-radius: 50px;
    margin: .3rem 1rem;
`;

export const MessageContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    border-left: 1px solid black;
`;


export const ServerImageWrapper = styled.div`

`

export const TopPartMessage = styled.div`
    display: flex;
    width: 98%;
    justify-content: space-between;
    padding: 1% 1%;
    border-top: 1px solid black;
`
