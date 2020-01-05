import React, { useState, useContext, useEffect } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {EditContext} from'../Contexts/EditContext' 
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import EditRecipe from './EditRecipe'

export const RecipeCard = props => {
    const {deleteRecipe, setRecipe, recipes } = useContext(AuthContext)

    

    console.log(props)

   


    const {deleteRecipe, editinfo, recipe} = useContext(AuthContext)

 useEffect (() => {
    editinfo(props.match.params.id)
 },[])
    
if(!recipe){
    return(
        <p>Loading</p>
    )
    
}

    return (

        
        <div>
            <EditContext.Provider value={{recipes}}>
            <div>
                <span>{recipe.recipe_name}</span>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
            </div>
           

            
                <Link to={`/edit-recipe/${props.match.params.id}`}>Update</Link>
            
                {/* <Route exact path = '/edit-recipe/:id' component ={EditRecipe}/> */}

               

            <button onClick={e => {deleteRecipe (props.match.params.id); props.history.push('/chefdash')} }>
                Delete
            </button>

            
 
            {/*Delete Button and OnClick to take us to the editRecipe */}
            </EditContext.Provider>
        </div>
    )
}