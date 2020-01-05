import React, { useContext, useEffect } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {EditContext} from'../Contexts/EditContext' 
import { Link } from 'react-router-dom';


export const RecipeCard = props => {
   
    
    const {deleteRecipe, editinfo, recipe, setRecipe, cancelItem} = useContext(AuthContext)
    console.log(recipe)
 useEffect (() => {
    editinfo(props.match.params.id)
 }, [])
    
if(!recipe){
    return(
        <p>Loading</p>
    )
    
}

    return (

        
        <div>
            <EditContext.Provider value={{recipe}} >
            <div>
            <button onClick={cancelItem} >Cancel</button>
                <span>{recipe.recipe_name}</span>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
            </div>
           
                {localStorage.getItem('token')? null :
            
                <Link to={`/edit-recipe/${props.match.params.id}`}>Update</Link>
            } 
            {localStorage.getItem('token')? null :    
                <button onClick={e => {deleteRecipe(props.match.params.id);
                
                props.history.push('/chefdash');
                                                              
            }}>
                Delete
            </button>
            }   
            
            </EditContext.Provider>
        </div>
    )
}