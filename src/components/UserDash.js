import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { RecipeCard } from './RecipeCard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';




const UserDash = props => {
    const [recipes, setRecipes] = useState([])
    
    
    // useEffect(() => {
    //     axios
    //     .get('https://chefportfolio10.herokuapp.com/api/recipes')
    //     .then(res => setRecipes(res.data))
    //     .catch(err => console.log(err.res))
    // }, [])
    
    return (
        <div>
            
     
                        
           {recipes.map(item => (
               <Link to={`/recipes/${item.id}`}>{item.recipe_name}</Link>   
         
           ))}
             

        </div>
        )
    
}
export default UserDash;