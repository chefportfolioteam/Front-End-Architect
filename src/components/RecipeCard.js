import React, { useContext, useEffect } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {EditContext} from'../Contexts/EditContext' 
import { Link } from 'react-router-dom';


export const RecipeCard = props => {
   
    console.log(props)
    const {deleteRecipe, editinfo, recipe} = useContext(AuthContext)

 useEffect (() => {
    editinfo(props.match.params.id)
 }, [props.match.params.id, editinfo])
    
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
            </div>
           

            
                <Link to={`/edit-recipe/${props.match.params.id}`}>Update</Link>
            
                {/* <Route exact path = '/edit-recipe/:id' component ={EditRecipe}/> */}

               

            <button onClick={e => {deleteRecipe(props.match.params.id);
                props.history.push('/chefdash')
                console.log(props.match.params.id)
                
            }}>
                Delete
            </button>

            
 
            {/*Delete Button and OnClick to take us to the editRecipe */}
            </EditContext.Provider>
        </div>
    )
}