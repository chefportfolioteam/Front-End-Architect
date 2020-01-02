import React, { useState, useContext } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {EditContext} from'../Contexts/EditContext' 

export const EditRecipe = props => {
    const [editRecipe, setEditRecipes] = useState({
        recipe_name: "",
        ingredients: "",
        instructions: ""
      });
console.log(props)

    const {recipeEdit} = useContext(AuthContext);
    // const {recipe} = useContext(EditContext)

    const handleChange = e => {
        setEditRecipes({
          ...editRecipe,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = e => {
        e.preventDefault();
        recipeEdit(editRecipe);
        setEditRecipes({
          recipe_name: "",
          ingredients: "",
          instructions: ""
        });
      };


    return (
<div>
            
            {/* <div><span>{props.recipe_name}</span></div>
            <img src={pictures[props.id]} alt=''/> */}

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
            <button>Update Recipe</button>
            
      </form>

</div>
    )
}

export default EditRecipe