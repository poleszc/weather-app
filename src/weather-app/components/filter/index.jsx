import { FilterWrapper } from "./FilterWrapper.jsx";
import { CityFilterWrapper } from "./CityFilterWrapper.jsx";
import { PopulationFilterWrapper } from "./PopulationFilterWrapper.jsx";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../state/citiesReducers.js";
import { filterSelector } from "../../state/selectors.js";

export const Filter = () => {

    const filterData = useSelector(filterSelector);
    const maxPopulation = 1000000;

    const dispatch = useDispatch();
    
    return (
        <FilterWrapper>
            <h1>Filter Cities</h1>
            
            <CityFilterWrapper>
                <label htmlFor="city"> 
                    City: 
                    <input type="text" name="city" onChange={(e) => dispatch(applyFilters({...filterData, cityName: e.target.value}))} />
                </label>
            </CityFilterWrapper>
            
            <PopulationFilterWrapper>
                <label htmlFor="population"> Population: 
                    <input 
                        name="population" 
                        type="range" 
                        min="0" 
                        max={maxPopulation} 
                        value={filterData.population || 0}
                        step={1000}
                        onChange={(e) => dispatch(applyFilters({...filterData, population: parseInt(e.target.value, 10)}))}
                        className="slider" 
                        id="myRange"
                        />
                    {filterData.population || 0}
                </label>
            </PopulationFilterWrapper>
                    
        </FilterWrapper>
    );
}