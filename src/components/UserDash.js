import React, {useState, useEffect} from 'react';
import axios from 'axios'

import { Link } from 'react-router-dom';
import SearchRecipe from './SearchRecipe';




const UserDash = () => {
    const [recipes, setRecipes] = useState([])
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = AbortController.signal 
        axios
        .get('https://chefportfolio10.herokuapp.com/api/recipes', { signal: signal })
        .then(res => {
            setRecipes(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err.res))
        return function cleanup() {
            abortController.abort()
        }
    }, [])
    
console.log(recipes)   
    
    return (
        <div>
            
           
            <SearchRecipe  />           
           {recipes.map((item, index) => (
              
               <Link key={index} to={`/recipes/${item.id}`} >{item.recipe_name}{item.mealtype}
                 
               </Link>   
         
           ))}

                {localStorage.getItem('token')? null :
                <nav>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
                </nav>
}
             

        </div>
        )
       
}
export default UserDash;