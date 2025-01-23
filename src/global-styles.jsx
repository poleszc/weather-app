import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    },

    html {
        height: 87.5%;
        min-width: 420px;
    },

    body,
    #root {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.background};
        font-size: ${({ theme }) => theme.fonts.basic.fontSize};
        font-family: ${({ theme }) => theme.fonts.basic.fontFamily};

    },

    body {
        margin-top: ${({ theme }) => theme.dims.basicSpacing};
        margin-right: ${({ theme }) => theme.dims.basicSpacing};
        margin-bottom: ${({ theme }) => theme.dims.basicSpacing};
        padding: 0 16px;
    }
        
    button {
        background-color: ${({theme}) => theme.colors.button};
        color: ${({theme}) => theme.colors.buttonText};
        border: none;
        padding: 0.5rem 1rem;
        border-radius: ${({ theme }) => theme.dims.borderRadius};
        cursor: pointer;
        font-size: ${({ theme }) => theme.fonts.basic.fontSize};
        
        &:hover {
            background-color: ${({ theme }) => theme.colors.buttonHover};
        }
    }

    input[type="text"], textarea {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        border-radius: ${({ theme }) => theme.dims.borderRadius};
        font-size: ${({ theme }) => theme.fonts.basic.fontSize};
        font-family: ${({ theme }) => theme.fonts.basic.fontFamily};
        color: ${({ theme }) => theme.colors.secondaryText};
        background-color: ${({ theme }) => theme.colors.inputBackground};

        &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.colors.inputBorder};
            box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

`;