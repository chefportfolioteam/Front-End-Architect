import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { RecipeCard } from './RecipeCard';




const UserDash = props => {
    const [recipes, setRecipes] = useState([])
    
    
    useEffect(() => {
        axios
        .get('https://chefportfolio10.herokuapp.com/api/recipes')
        .then(res => setRecipes(res.data))
        .catch(err => console.log(err.res))
    }, [])
    
    return (
        <div>
            
     
                        
           {recipes.map(item => (
               <RecipeCard 
                    
                    key={item.id} {...item} 
                    recipe_name={item.recipe_name}
                    user_id={item.user_id}
                    />
         
           ))}
             

        </div>
        )
    
}
export default UserDash;