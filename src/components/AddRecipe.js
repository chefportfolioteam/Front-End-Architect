import React, { useState, useContext } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import { withRouter } from 'react-router-dom'
import ControlledOpenSelect from './MealType'


const AddRecipe = props => {
  const [mealType, setMealType] = useState('');
  const [newRecipe, setNewRecipes] = useState({
    recipe_name: "",
    mealtype: 'mealType',
    ingredients: "",
    instructions: ""
  });

  const { addRecipe } = useContext(AuthContext);

  const handleChange = e => {
    setNewRecipes({
      ...newRecipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    newRecipe.mealtype = mealType
    addRecipe(newRecipe)
    props.history.push('/chefdash')
  };

  return (
    <div className="add-recipe">
      <form onSubmit={handleSubmit}>
        {/* <ImageUpload/> */}
        <h3> Recipe Name</h3>
        <input onChange={handleChange} name="recipe_name" placeholder="Recipe Name" />
        <br/>
        {localStorage.getItem('token') &&
                <ControlledOpenSelect setMealType={setMealType} mealType={mealType} />}
        <textarea onChange={handleChange} name="ingredients"
        placeholder="Ingredients" 
        type="text"/>
        <br/>
        <textarea onChange={handleChange} name="instructions" 
               placeholder="Description" />
        <br/>
        <button>Add Recipe</button>

        {/* possibly add a delect function here */}
      </form>
    </div>
  );
};

export default withRouter(AddRecipe);
