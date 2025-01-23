import styled from 'styled-components';

export const FilterWrapper = styled.div`
    flex-basis: 25%;
    border-radius: ${({ theme }) => theme.dims.borderRadius};
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 1.5rem;
`;