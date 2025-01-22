import { useDispatch, useSelector } from "react-redux";

import { filterSelector, maxPopulationInVisibleCitiesSelector } from "../../state/selectors.js";
import { FilterWrapper } from "./FilterWrapper.jsx";
import { PopulationFilterWrapper } from "./PopulationFilterWrapper.jsx";
import { applyFilters } from "../../state/cityDataReducers.js";

export const Filter = () => {
    const filterData = useSelector(filterSelector);
    const maxPopulation = useSelector(maxPopulationInVisibleCitiesSelector);
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