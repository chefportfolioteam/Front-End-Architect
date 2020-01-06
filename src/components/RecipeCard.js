import React, { useContext, useEffect } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {EditContext} from'../Contexts/EditContext' 
import { Link } from 'react-router-dom';
import ChefDash from "./UserDash";

import UserDash from "./UserDash";
import EditRecipe from "./EditRecipe";



export const RecipeCard = props => {
   
    
    const {deleteRecipe, editinfo, recipe, recipes, cancelItem,  } = useContext(AuthContext)
    
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
            
                <span>{recipe.recipe_name}</span>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                <button onClick={cancelItem} >Cancel</button>
            </div>

               {localStorage.getItem('token') &&
                
                <Link to={`/edit-recipe/${props.match.params.id}`}>Update</Link>
             
                }
                {localStorage.getItem('token') &&
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