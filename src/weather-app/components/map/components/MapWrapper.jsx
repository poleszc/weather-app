import { MapContainer } from 'react-leaflet';
import styled from 'styled-components';

export const MapWrapper = styled.div`
    flex-basis: 75%;
    .leaflet-container {
        height: 100%;
        width: 100%;
    }
`;

export const StyledMapContainer = styled(MapContainer)`
    border-radius: ${({theme}) => theme.dims.borderRadius};
    position: relative;
`;