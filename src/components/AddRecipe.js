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
  const cancelRecipe = () => {
    window.history.back();
  }
  return (
    <div className="add-recipe">
      <form onSubmit={handleSubmit}>
        
        <h3> Add Recipes to Profile</h3>
        <input className='recipe-name' onChange={handleChange} name="recipe_name" placeholder="Recipe Name" />
        <br/>
        {localStorage.getItem('token') &&
                <ControlledOpenSelect className='drop-down' setMealType={setMealType} mealType={mealType} />}
      
        <textarea className='ingredients' onChange={handleChange} name="ingredients"
        placeholder="Ingredients" 
        type="text"/>        
      
        <br/>
        <textarea className='instructions' onChange={handleChange} name="instructions" 
               placeholder="Description" />
        <br/>
        <button className='add-button' >Add Recipe</button>
        <button onClick={cancelRecipe} className='cancel-button' >Cancel</button>
        {/* possibly add a delect function here */}
      </form>
    </div>
  );
};

export default withRouter(AddRecipe);
