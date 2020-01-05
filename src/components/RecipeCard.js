import React, { useState, useContext, useEffect } from "react";
import {AuthContext} from'../Contexts/AuthContext'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {EditContext} from'../Contexts/EditContext' 
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import EditRecipe from './EditRecipe'

export const RecipeCard = props => {
    const {deleteRecipe, setRecipe, recipes } = useContext(AuthContext)

    

    console.log(props)

    useEffect(() => {
        axiosWithAuth()
        .get(`/recipes/${props.match.params.id}`)
        .then(res => setRecipe(res.data))
        
        .catch(err => console.log(err.res))

    }, [props.match.params.id])

    console.log(recipes)


    
if(!recipes){
    return(
        <p>Loading</p>
    )
    
}

    return (

        
        <div>
            <EditContext.Provider value={{recipes}}>
            <div>
                <span>{recipes.recipe_name}</span>
                <span>{recipes.ingredients}</span>
                <span>{recipes.instructions}</span>
            
            </div>
           

            
                <Link to={`/edit-recipe/${props.match.params.id}`}>Update</Link>
            
                {/* <Route exact path = '/edit-recipe/:id' component ={EditRecipe}/> */}

                <Route path="/edit-recipe/:id" render={props => 
                         <EditRecipe {...props} recipe={recipes} />}/>
                         
            <button onClick={e => deleteRecipe(props.item.id)}>
                Delete
            </button>

            
 
            {/*Delete Button and OnClick to take us to the editRecipe */}
            </EditContext.Provider>
        </div>
    )
}