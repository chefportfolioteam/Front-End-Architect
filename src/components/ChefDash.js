import React, { useState, useEffect, useContext } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Logout from './Logout'
import AddRecipe from './AddRecipe'
import { RecipeCard } from './RecipeCard';
import { Route, Link } from "react-router-dom";




 const ChefDash = (props) => {
    const [recipes, setRecipes] = useState([])
    //get posts from api server using axioswithAuth
    useEffect(() => {
        axiosWithAuth()
        .get(`/auth/user/${localStorage.getItem('userId')}`)
        .then(res => setRecipes(res.data))
        .catch(err => console.log(err.res))

    }, [recipes])

    
//put request for the edit passing post(body)
//assigning variable that will be passed to editPost
   
    return (
        <div>
            
            <h1>Chef DashBoard</h1>
            <h1>Recipes</h1>
            {/* <AddRecipedkdkdkjkfdls /> */}

            
          
          
            {recipes.map(item => (
                
                   <Link to={`/recipes/${item.id}`}>{item.recipe_name}</Link>   
           ))}
                <Link to='/create'>
                    Create Recipe
                </Link>

               <Logout/>
                
        </div>
        //Have an Add Button and this button
        //will take us to the Add Recipe Form
        //Put an onClick inside the div
    )
}
export default ChefDash;