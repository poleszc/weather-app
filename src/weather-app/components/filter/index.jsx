import { FilterWrapper } from "./FilterWrapper.jsx";

export const Filter = () => {
    let value = 0;
    const doSomething = (e) => {
        console.log(e.target.value);
        value=e.target.value;
    };
    
    return (
        <FilterWrapper>
            <h1>Filter Cities</h1>
            <label htmlFor="city"> City: </label>
            <input type="text" name="city" />
            
            <label htmlFor="population"> Population: </label>
            <input 
                name="population" 
                type="range" 
                min="0" 
                max="1000000000" 
                value={value} // TODO: Change that
                onChange={doSomething}
                className="slider" 
                id="myRange"
            />
            {value}
        </FilterWrapper>
    );
}