import styled from 'styled-components';

export const Wrapper = styled.section`
    display: flex;
    flex-direction: row;
`;

export const ServerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

export const ImageWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    object-fit: cover;
    width: 100px;
    height: 100px;
`;

export const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;
