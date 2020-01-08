import React, { useContext, useEffect } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {EditContext} from'../Contexts/EditContext' 
import { Link } from 'react-router-dom';
import {pictures} from '../images'





 const RecipeCard = props => {
   
    
    const {deleteRecipe, editinfo, recipe, cancelItem  } = useContext(AuthContext)
    
    useEffect (() => {
    editinfo(props.match.params.id)
    }, [])
    
    if(!recipe){
        return(
            <p>Loading</p>
    )
    
}
console.log('recipecard',props.id)
    return (

        
        <div>
            <EditContext.Provider value={{recipe}} >
            <div>
            {/* <img src={pictures[props.id]} alt=''/> */}
                <span>{recipe.recipe_name}</span>
                <div>{recipe.mealtype} </div>
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
export default RecipeCard