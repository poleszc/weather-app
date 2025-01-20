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

        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.background};
    
        font-size: ${({ theme }) => theme.fonts.basic.fontSize};
        font-family: ${({ theme }) => theme.fonts.basic.fontFamily};

        margin: 0;
        padding: 0;
    }

    body {
     //     margin: ${({ theme }) => theme.dims.bigSpacing};
        // margin: 8px;
        padding: 0 16px;
    }

    button {
        background-color: #444;
        color: #fff;
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
            border: 2px solid #fff;
        }
    }
    
`;