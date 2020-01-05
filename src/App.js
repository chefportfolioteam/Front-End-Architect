import React, {useState, useEffect} from 'react';
import './App.css';
import UserDash from './components/UserDash'
import PrivateRoute from './utils/PrivateRoute'
import { 
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
    } from 'react-router-dom';
import{Login} from './components/Login'
import {axiosWithAuth} from './utils/axiosWithAuth'
import ChefDash from './components/ChefDash'
import {AuthContext} from'./Contexts/AuthContext' 
import Signup from './components/Signup'
import EditRecipe from './components/EditRecipe';
import { RecipeCard } from './components/RecipeCard';
import AddRecipe from './components/AddRecipe'






function App() {

const [recipe, setRecipe]= useState()


  const [recipes, setRecipes] = useState([])
    //get posts from api server using axioswithAuth
    useEffect(() => {
        axiosWithAuth()
        .get(`/auth/user/${localStorage.getItem('userId')}`)

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

const addRecipe = (newRecipe, e) => {
    axiosWithAuth()
    .post(`/auth/user/1`, newRecipe )
    .then(res => { 
          
           
        setRecipes(recipes => [...recipes, res, recipe])
      
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
        .then(res => {
            setRecipe(res.data)
        })    
        .catch(err => console.log(err.res))
    console.log(recipe)
}
// the cancel Button to back out of modals
const cancelItem = () => {
    window.history.back();
  };

  return (
    
      <div className="App">
        <AuthContext.Provider value={{
            recipeEdit, 
            addRecipe, 
            deleteRecipe, 
            editinfo, 
            recipe,
            cancelItem,
           
            }}>
           
           <Route exact path='/' component={UserDash}/>
           {/* <UserDash/> */}
           
           <Router>

               {localStorage.getItem('token')? null :
                <nav >
                    
                  
                    <Link to='/login'
                    >Log In</Link>
                    <Link to=
                    '/signup'
                    >Sign Up</Link>
                  
                </nav> }

                
                <PrivateRoute>
                <Route exact path='/chefdash' component={ChefDash}/>
                <Route path ='/create' component={AddRecipe}/>
                </PrivateRoute>
                <Switch>
                <Route  path='/login' component={Login}/> 
                <Route  path='/signup' component={Signup}/>
                </Switch>
                {/* <Route exact path = '/edit-recipe/:id' component ={EditRecipe}/> */}
                
                <Route path="/edit-recipe/:id" render={props => 
                         <EditRecipe {...props} recipe={recipe} />}/>
               
                {/* <Route exact path = '/recipes/:id' component={RecipeCard}/> */}
                

                <Route path="/recipes/:id" render={props => 
                         <RecipeCard  {...props} />}/>
            </Router>
        </AuthContext.Provider>
      </div>
       

  );
}

export default App;
