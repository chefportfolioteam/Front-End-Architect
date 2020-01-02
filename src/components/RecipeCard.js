import React, { useState, useContext, useEffect } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {EditContext} from'../Contexts/EditContext' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EditRecipe from './EditRecipe'

export const RecipeCard = props => {

    const [recipe, setRecipe]= useState()

    console.log(props)

    useEffect(() => {
        axiosWithAuth()
        .get(`/recipes/${props.match.params.id}`)
        .then(res => setRecipe(res.data))
        
        .catch(err => console.log(err.res))

    }, [])

    console.log(recipe)


    const {deleteRecipe} = useContext(AuthContext)
if(!recipe){
    return(
        <p>Loading</p>
    )
    
}

    return (

        
        <div>
            <EditContext.Provider value={{recipe}}>
            <div>
                <span>{recipe.recipe_name}</span>
                <span>{recipe.ingredients}</span>
                <span>{recipe.instructions}</span>
            
            </div>
           

            
                <Link to={`/edit-recipe/${props.match.params.id}`}>Update</Link>
            
                {/* <Route exact path = '/edit-recipe/:id' component ={EditRecipe}/> */}

                <Route path="/edit-recipe/:id" render={props => 
                         <EditRecipe {...props} recipe={recipe} />}/>
                         
            <button onClick={e => deleteRecipe(props.item.id)}>
                Delete
            </button>

            
 
            {/*Delete Button and OnClick to take us to the editRecipe */}
            </EditContext.Provider>
        </div>
    )
}