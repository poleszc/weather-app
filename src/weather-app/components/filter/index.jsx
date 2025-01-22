import { FilterWrapper } from "./FilterWrapper.jsx";
import { CityFilterWrapper } from "./CityFilterWrapper.jsx";
import { PopulationFilterWrapper } from "./PopulationFilterWrapper.jsx";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../state/citiesReducers.js";
import { filterSelector, maxPopulationInVisibleCitiesSelector } from "../../state/selectors.js";

export const Filter = () => {
    const filterData = useSelector(filterSelector);
    const maxPopulation = useSelector(maxPopulationInVisibleCitiesSelector);
    const dispatch = useDispatch();

    // const maxPopulation = 1000000;
    
    return (
        <FilterWrapper>
            <h1>Filter Cities</h1>
            
            <CityFilterWrapper>
                <label htmlFor="city"> 
                    City Name: <br />
                    <input 
                        type="text" 
                        name="city" 
                        onChange={(e) => 
                            dispatch(applyFilters(
                                {...filterData, city: e.target.value}
                        ))}
                    />
                </label>
            </CityFilterWrapper>
            
            <PopulationFilterWrapper>
                <label htmlFor="population" style={{ display: 'block', width: '100%' }}> 
                    Minimum Population: <br /> 
                    <input 
                        name="population" 
                        type="range" 
                        min="0" 
                        max={maxPopulation} 
                        value={filterData.population || 0}
                        step={1000}
                        onChange={(e) => 
                            dispatch(applyFilters(
                                {...filterData, population: parseInt(e.target.value, 10)}
                        ))}
                        className="slider" 
                        id="myRange"
                    />
                    {filterData.population || 0}
                </label>
            </PopulationFilterWrapper>

            <button onClick={() => dispatch(applyFilters({city: '', population: 0}))}>
                Reset filters
            </button>
                    
        </FilterWrapper>
    );
}