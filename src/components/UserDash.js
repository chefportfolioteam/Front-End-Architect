import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import pictures from '../images'
import SearchRecipe from './SearchRecipe';





const UserDash = props => {
    const [recipes, setRecipes] = useState([])
    const [searchRecipes, setSearchRecipes] = useState([])
    useEffect(() => {
        const abortController = new AbortController()
        const signal = AbortController.signal 
        axios
        .get('https://chefportfolio10.herokuapp.com/api/recipes', { signal: signal })
        .then(res => {
            setRecipes(res.data)
            setSearchRecipes(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err.res))
        return function cleanup() {
            abortController.abort()
        }
    }, [])
   
  
    return (
        <div>
            
            <SearchRecipe setSearchRecipes={setSearchRecipes} recipes={recipes}/>


            {localStorage.getItem('token')? null :
                <nav>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
                </nav>
                }
           
            
            
                      
           {searchRecipes.map((item, index) => (
               
               
               
               <Link key={index.id} to={`/recipes/${item.id}`} >{item.mealtype}<br/>{<img src={pictures[index]}alt='food'/>}<br/>{item.recipe_name}<br/>
                 
               </Link> 
                         
           ))}


                
             

        </div>
        )
       
}
export default UserDash;