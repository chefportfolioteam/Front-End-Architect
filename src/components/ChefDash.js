import React, { useState, useEffect } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Logout from './Logout'
import { Link } from "react-router-dom";
import pictures from '../images'




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
           

            
          
          
            {recipes.map((item, index) => (
            
            <Link key={index.id} to={`/recipes/${item.id}`}>{item.mealtype}<br/>{<img src={pictures[index]}alt='food'/>}<br/>{item.recipe_name}<br/></Link> 
                   
           ))}
                <Link to='/create'>Create Recipe</Link>

               <Logout />
                
        </div>
        
    )
}
export default ChefDash;