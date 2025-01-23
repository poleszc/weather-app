import styled from "styled-components";

export const PopulationFilterWrapper = styled.div`
    input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 10px;
        background: ${({ theme }) => theme.colors.inputBackground};
        border-radius: 4px;
        outline: none;
        opacity: 0.9;
        transition: opacity 0.2s;
    }

    input[type="range"]:hover {
        opacity: 1;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.sliderThumb};
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        border: 2px solid ${({ theme }) => theme.colors.sliderThumbBorder};
    }

    input[type="range"]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.sliderThumb};
        cursor: pointer;
        border: 2px solid ${({ theme }) => theme.colors.sliderThumbBorder};
    }
`;