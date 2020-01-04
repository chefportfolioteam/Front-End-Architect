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




function App() {
// console.log(localStorage.getItem('userId'))
  const [recipes, setRecipes] = useState([])
    //get posts from api server using axioswithAuth
  const [open, setOpen] = useState(false)
    useEffect(() => {
        axiosWithAuth()
        .get(`/auth/user/${localStorage.getItem('userId')}`)
        .then(res => setRecipes(res.data))
        .catch(err => console.log(err.res))

    }, [])



  const recipeEdit = recipe => {
    axiosWithAuth()
    .put(`/auth/user/recipes${recipes.id}`, recipe)
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
//delete request for deletepost
const deleteRecipe = post => {
    axiosWithAuth()
    .delete(`/auth/user/recipes/${recipes.id}`)
    .then(res => {
        setRecipes(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}
const onSubmit = e => {
  e.preventDefault()
  setOpen(true)
} 
const cancelItem = () => {
  // window.history.back();
  setOpen(false)
  console.log(setOpen)
};    
  return (

      <div className="App">
         <Login setOpen={setOpen} />  
        <AuthContext.Provider value={{recipeEdit, addRecipe, deleteRecipe}}>
           <UserDash/>
           
           <Router> 
                <nav>
                {/* <Link to='/login'>Log In</Link> */}
                <Link to='/signup'>Sign Up</Link>
                <button onClick={onSubmit}>Log In</button>
                
                </nav>

                   
                <PrivateRoute exact path='/chefdash' component={ChefDash}/> 
                {/* <Route path='/login' component={Login}/>  */}
                <Route path='/signup' component={Signup}/>
                <Route path='/' component={Logout}/>
            </Router>
        </AuthContext.Provider>
      </div>
       

  );
}

export default App;
