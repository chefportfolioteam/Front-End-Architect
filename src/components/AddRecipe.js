import React, { useState, useContext } from "react";
import {AuthContext} from'../Contexts/AuthContext'

const AddRecipe = props => {
  const [newRecipe, setNewRecipes] = useState({
    recipe_name: "",
    ingredients: "",
    instructions: ""
  });


  const {addRecipe} = useContext(AuthContext)

  const handleChange = e => {
    setNewRecipes({
      ...newRecipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addRecipe(newRecipe);
    setNewRecipes({
      recipe_name: "",
      ingredients: "",
      instructions: ""
    });
  };

  return (
    <div className="add-recipe">
      <form onSubmit={handleSubmit}>
        <h3> Recipe Name</h3>
        <input onChange={handleChange} name="recipe_name" placeholder="Recipe Name" />
        <br/>
        <textarea onChange={handleChange} name="ingredients"
        placeholder="Ingredients" 
        type="text"/>
        <br/>
        <textarea onChange={handleChange} name="instructions" 
               placeholder="Description" />
        <br/>
        <button>Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
