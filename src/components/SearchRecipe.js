import React, { useState, useEffect, useContext } from "react";
import RecipeCard from './RecipeCard';
import {AuthContext} from'../Contexts/AuthContext'





const SearchRecipe = (props) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const {recipes} = useContext(AuthContext)

  useEffect (() => { 
    const data = recipes.filter(rec => rec.recipe_name.toLowerCase().includes(search.toLowerCase()));
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
       placeholder="Search..." 
       value={search} 
       onChange={handleChange} />
     </form>

      {
        results.length === 0
        ? (<div>
        {recipes.map(rec => (
          <RecipeCard 
         
          key={rec.id} 
          recipe_name={rec.recipe_name} 
          mealtype={rec.mealtype} 
          ingredients={rec.ingredients} 
          instructions={rec.instructions} 
          />
        ))}
      </div>) 
      : (<RecipeCard>
        {results.map(rec => (
          <RecipeCard 
          key={rec.id} 
          recipe_name={rec.recipe_name} 
          mealtype={rec.mealtype} 
          ingredients={rec.ingredients} 
          instructions={rec.instructions} 
          />
        ))}
      </RecipeCard>)
      }

  </section>
  )
}
export default SearchRecipe;