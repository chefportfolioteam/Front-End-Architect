import React, {useState, useEffect} from 'react';
import './App.css';
import UserDash from './components/UserDash'
import PrivateRoute from './utils/PrivateRoute'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import{Login} from './components/Login'
import {axiosWithAuth} from './utils/axiosWithAuth'
import ChefDash from './components/ChefDash'
import {AuthContext} from'./Contexts/AuthContext' 
import Signup from './components/Signup'
import Logout from './components/Logout'
import EditRecipe from './components/EditRecipe';
import { RecipeCard } from './components/RecipeCard';
import AddRecipe from './components/AddRecipe'




function App() {

const [recipe, setRecipe]= useState()

console.log(localStorage.getItem('userId'))
  const [recipes, setRecipes] = useState([])
    //get posts from api server using axioswithAuth
    useEffect(() => {
        axios
        .get('https://chefportfolio10.herokuapp.com/api/recipes')

        .then(res => setRecipes(res.data))
       
        .catch(err => console.log(err.res))

    }, [])

    



  const recipeEdit = (recipe, id) => {
      console.log(recipe)
    axiosWithAuth()
    .put(`/auth/user/recipes/${id}`, recipe)
    .then(res => {
        setRecipes(res.data)
    })
    .catch(err => {
        console.log(err)
    })

   
}
//post request to add post newPost

const addRecipe = newRecipe => {
    axiosWithAuth()
    .post('/auth/user/1', newRecipe )
    .then(res => {
      console.log(res)
        setRecipes(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteRecipe = id => {
    axiosWithAuth()
    .delete(`/auth/user/recipes/${id}`)
    .then(res => {
        setRecipes(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

const editinfo = id => {



        axiosWithAuth()
        .get(`/recipes/${id}`)
        .then(res => setRecipe(res.data))
     
        .catch(err => console.log(err.res))


    

    console.log(recipe)


}

      
  return (
    
      <div className="App">
        <AuthContext.Provider value={{recipeEdit, addRecipe, deleteRecipe, editinfo, recipe}}>
           
           <Route exact path='/' component={UserDash}/>
           {/* <UserDash/> */}
           
           <Router>

               {localStorage.getItem('token')? null :
                <nav>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
                </nav>
}
                
                <PrivateRoute>
                <Route exact path='/chefdash' component={ChefDash}/>
                <Route path ='/create' component={AddRecipe}/>
                </PrivateRoute>
                <Route exact path='/login' component={Login}/> 
                <Route exact path='/signup' component={Signup}/>
                
                {/* <Route exact path = '/edit-recipe/:id' component ={EditRecipe}/> */}
                
                <Route path="/edit-recipe/:id" render={props => 
                         <EditRecipe {...props} recipe={recipe} />}/>
               
                {/* <Route exact path = '/recipes/:id' component={RecipeCard}/> */}
                

                <Route path="/recipes/:id" render={props => 
                         <RecipeCard {...props} />}/>
            </Router>
        </AuthContext.Provider>
      </div>
       

  );
}

export default App;
