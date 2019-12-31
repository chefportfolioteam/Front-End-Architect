import React, { useState, useEffect, useContext } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Logout from './Logout'
import AddRecipe from './AddRecipe'



 const ChefDash = () => {
    const [recipes, setRecipes] = useState([])
    //get posts from api server using axioswithAuth
    useEffect(() => {
        axiosWithAuth()
        .get(`/auth/user/${localStorage.getItem('userId')}`)
        .then(res => setRecipes(res.data))
        .catch(err => console.log(err.res))

    }, [])

    
//put request for the edit passing post(body)hhdhdhd
//assigning variable that will be passed to editPost
   
    return (
        <div>
            
            <h1>Chef DashBoard</h1>
            <h1>Recipes</h1>
            <AddRecipe />
          
          
        {/* {recipes.map(post => (
                <EditRecipes
                    key={post.id}
                    recipes={recipes}
                    recipeEdit={recipeEdit}
                    deleteRecipe={deleteRecipe}
                    />                    
                    
            ))} */}
                
        </div>
        // Have an Add Button and this button
        //will take us to the Add Recipe Form
        //Put an onClick inside the div
    )
}
export default ChefDash;