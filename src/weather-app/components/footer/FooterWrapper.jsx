import styled from 'styled-components';

export const FooterWrapper = styled.div`
    background-color: ${({theme}) => theme.colors.footer};
    border-radius: 10px;
    color: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;