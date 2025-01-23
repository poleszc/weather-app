import { useDispatch, useSelector } from "react-redux";

import { 
    filterSelector, 
    maxPopulationInVisibleCitiesSelector,
    minPopulationInVisibleCitiesSelector
} from "../../state/selectors.js";
import { FilterWrapper } from "./FilterWrapper.jsx";
import { PopulationFilterWrapper } from "./PopulationFilterWrapper.jsx";
import { applyFilters } from "../../state/cityDataReducers.js";

export const Filter = () => {
    const filterData = useSelector(filterSelector);
    const maxPopulation = useSelector(maxPopulationInVisibleCitiesSelector);
    const minPopulation = useSelector(minPopulationInVisibleCitiesSelector);
    const dispatch = useDispatch();

    return (
        <FilterWrapper>
            <h1>Filter Cities</h1>
            
            <label> 
                City Name: <br />
                <input 
                    type="text" 
                    name="city"
                    value={filterData.city || ''}
                    onChange={(e) => 
                        dispatch(applyFilters(
                            {...filterData, city: e.target.value}
                    ))}
                />
            </label>
            
            <PopulationFilterWrapper>
                <label style={{ display: 'block', width: '100%' }}> 
                    Minimum Population: <br /> 
                    <input 
                        name="population" 
                        type="range" 
                        min={minPopulation} 
                        max={maxPopulation} 
                        value={filterData.population || minPopulation}
                        step={1000}
                        onChange={(e) => 
                            dispatch(applyFilters(
                                {...filterData, population: parseInt(e.target.value, 10)}
                        ))}
                        className="slider" 
                        id="myRange"
                    />
                    {filterData.population || minPopulation}
                </label>
            </PopulationFilterWrapper>

            <button onClick={() => dispatch(applyFilters({city: '', population: 0}))}>
                Reset filters
            </button>
        </FilterWrapper>
    );
}