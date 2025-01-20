import { 
    Header,
    MapFilterWrapper,
    Map,
    Filter,
    Footer
 } from './components';

export const WeatherApp = () => {
    return (
        <>
            <Header />

            <MapFilterWrapper>
                <Map />
                <Filter />
            </MapFilterWrapper>

            <Footer />
        </>
    );
};