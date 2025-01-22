import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        height:87.5%;
        min-width: 420px;
        // overflow: hidden;
    }
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

    }

    body {
     //     margin: ${({ theme }) => theme.dims.bigSpacing};
        // margin: 8px;
        padding: 0 16px;
    }

    button {
        background-color: ${({theme}) => theme.colors.button};
        color: ${({theme}) => theme.colors.text};
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        
        &:hover {
            background-color: #666;
        }

        &:focus {
            outline: none;
            // border: 2px solid #fff;
        }
    }

    input[type="text"], textarea {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border: 1px solid ${({ theme }) => theme.colors.inputBorder || '#ccc'};
        border-radius: 4px;
        font-size: 1rem;
        font-family: ${({ theme }) => theme.fonts.basic.fontFamily};
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.inputBackground || '#fff'};

        &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.colors.inputFocusBorder || '#007BFF'};
            box-shadow: 0 0 5px ${({ theme }) => theme.colors.inputFocusShadow || 'rgba(0, 123, 255, 0.5)'};
        }
    }

    textarea {
        resize: vertical;
        min-height: 100px;
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