import styled from 'styled-components';

export const FooterWrapper = styled.div`
    background-color: ${({theme}) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.dims.borderRadius};
    color: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;