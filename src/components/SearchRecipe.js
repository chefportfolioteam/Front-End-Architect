import React from "react";

const SearchRecipe = props => {
  
  const handleChange = event => {
    const result = props.recipes.filter(recipe =>
      recipe.recipe_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    props.setSearchRecipes(result);
  };
  return (
    <section className="search-form">
      <form className="search">
        <input className='search-input'
          type="text"
          name="textfield"
          placeholder="Search..."
          onChange={handleChange}
        />
      </form>
    </section>
  );
};
export default SearchRecipe; 
