import React, { useState, useEffect } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Logout from './Logout'
import { Link } from "react-router-dom";




 const ChefDash = (props) => {
    const [recipes, setRecipes] = useState([])
    //get posts from api server using axioswithAuth
    useEffect(() => {
        const abortController = new AbortController()
        const signal = AbortController.signal
        axiosWithAuth()
        .get(`/auth/user/${localStorage.getItem('userId')}`, { signal: signal })
        .then(res => setRecipes(res.data))
        .catch(err => console.log(err.res))
        return function cleanup() {
            abortController.abort()
        }
    }, [recipes])

    
    return (
        <div>
            
            <h1>Chef DashBoard</h1>
            <h1>Recipes</h1>
           

            
          
          
            {recipes.map(item => (
            
            <Link  to={`/recipes/${item.id}`}>{item.recipe_name}{item.meal}</Link> 
                     
           ))}
                <Link to='/create'>Create Recipe</Link>

               <Logout />
                
        </div>
        //Have an Add Button and this button
        //will take us to the Add Recipe Form
        //Put an onClick inside the div
    )
}
export default ChefDash;