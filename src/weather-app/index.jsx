import { 
    Header,
    MapFilterWrapper,
    Map,
    Filter,
    TestComponent,
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