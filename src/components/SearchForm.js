import React, { useState, useEffect } from "react";
import {RecipeCard} from './RecipeCard'


const SearchForm = (props) => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
  
    useEffect (() => { 
      const data = props.recipes.filter(rec => rec.name.toLowerCase().includes(search.toLowerCase()));
      setResults(data);
    },[search]);
  
    const handleChange = event => {
      setSearch(event.target.value);
    };
   
    return (
      <section className="search-form">
       <form className="search">
         <input 
         type="text" 
         name="textfield" 
         placeholder="Search" 
         value={search} 
         onChange={handleChange} />
       </form>
  
        {
          results.length === 0
          ? (<>
          {props.recipes.map(recip => (
            <RecipeCard 
            key={recip.id} 
            name={recip.recipe_name} 
            ingredients={recip.ingredients} 
            instructions={recip.instructions} 
            />
          ))}
        </>) 
        : (<>
          {results.map(recip => (
            <RecipeCard 
            key={recip.id} 
            name={recip.name} 
            ingredients={recip.ingredients} 
            instructions={recip.instructions} 
            />
          ))}
        </>)
        }
  
    </section>
    )
  }
  export default SearchForm;