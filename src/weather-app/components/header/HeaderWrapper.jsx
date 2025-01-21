import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;

    background-color: ${({theme}) => theme.colors.header};
    color: ${({theme}) => theme.colors.text};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
