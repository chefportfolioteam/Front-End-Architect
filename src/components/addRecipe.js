import React, { useState } from "react";

const AddRecipe = props => {
  const [newRecipe, setNewRecipes] = useState({
    recipeName: "",
    recipeIngredients: "",
    recipeDescription: ""
  });

  const handleChange = e => {
    setNewRecipes({
      ...newRecipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.AddRecipe(newRecipe);
    setNewRecipes({
      recipeName: "",
      recipeIngredients: "",
      recipeDescription: ""
    });
  };

  return (
    <div className="add-recipe">
      <form onSubmit={handleSubmit}>
        <h3> Recipe Name</h3>
        <input onChange={handleChange} name="Recipe Name" placeholder="Recipe Name" />
        <br/>
        <textarea name="Ingredients"
        placeholder="Ingredients" 
        type="text"/>
        <br/>
        <textarea name="Description" 
               placeholder="Description" />
        <br/>
        <button>Add Recipe</button>

        {/* possibly add a delect function here */}
      </form>
    </div>
  );
};

export default AddRecipe;
