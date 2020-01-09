import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

//edit
export const EditRecipe = props => {
  const { recipeEdit } = useContext(AuthContext);
  const { recipe } = useContext(AuthContext);

  const [editRecipe, setEditRecipes] = useState({
    recipe_name: recipe.recipe_name,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions
  });
  console.log(props);

  console.log(recipe);

  const handleChange = e => {
    setEditRecipes({
      ...editRecipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    recipeEdit(editRecipe, props.match.params.id);
    setEditRecipes({
      recipe_name: "",
      ingredients: "",
      instructions: ""
    });
    props.history.push("/chefdash");
  };

  return (
    <div>
      {/* <div><span>{props.recipe_name}</span></div>
            <img src={pictures[props.id]} alt=''/> */}

      <form onSubmit={handleSubmit}>
        <h3> Recipe Name</h3>
        <input
          onChange={handleChange}
          name="recipe_name"
          placeholder="Recipe Name"
          value={editRecipe.recipe_name}
        />
        <br />
        <textarea
          onChange={handleChange}
          name="ingredients"
          placeholder="Ingredients"
          type="text"
          value={editRecipe.ingredients}
        />
        <br />
        <textarea
          onChange={handleChange}
          name="instructions"
          placeholder="Description"
          value={editRecipe.instructions}
        />
        <br />
        <button>Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
