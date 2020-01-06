import React, { useState, useEffect } from "react";
import "./App.css";
import UserDash from "./components/UserDash";
import PrivateRoute from "./utils/PrivateRoute";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Login } from "./components/Login";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import ChefDash from "./components/ChefDash";
import { AuthContext } from "./Contexts/AuthContext";
import Signup from "./components/Signup";
import EditRecipe from "./components/EditRecipe";
import { RecipeCard } from "./components/RecipeCard";
import AddRecipe from "./components/AddRecipe";

function App() {
  //setting state for recipe
  const [recipe, setRecipe] = useState();

  // const [recipes, setRecipes] = useState([])
  //get posts from api server using axioswithAuth
  useEffect(() => {
    axiosWithAuth()
      .get(`/auth/user/${localStorage.getItem("userId")}`)

      .then(res => setRecipe(res.data))

      .catch(err => console.log(err.res));
  }, []);

  const recipeEdit = (recipe, id) => {
    console.log(recipe);
    axiosWithAuth()
      .put(`/auth/user/recipes/${id}`, recipe)
      .then(res => {
        setRecipe(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //post request to add post newPost

  const addRecipe = newRecipe => {
    axiosWithAuth()
      .post(`/auth/user/1`, newRecipe)
      .then(res => {
        setRecipe(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteRecipe = id => {
    axiosWithAuth()
      .delete(`/auth/user/recipes/${id}`)
      .then(res => {
        setRecipe(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editinfo = id => {
    axiosWithAuth()
      .get(`/recipes/${id}`)
      .then(res => {
        setRecipe(res.data);
      })
      .catch(err => console.log(err.res));
  };
  // the cancel Button to back out of modals
  const cancelItem = () => {
    window.history.back();
  };

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          recipeEdit,
          addRecipe,
          deleteRecipe,
          editinfo,
          recipe,
          cancelItem,
          setRecipe
        }}
      >
        

        <Router>
          {localStorage.getItem("token") ? null : (
            <nav>
              <Link  to="/login">Log In</Link>
                
              <Link  to="/signup">Sign Up</Link>
            </nav>
          )}
          <Route exact path="/" component={UserDash} />
          <PrivateRoute>
            <Route exact path="/chefdash" component={ChefDash} />
            <Route path="/create" component={AddRecipe} />
          </PrivateRoute>
          
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route
              path="/edit-recipe/:id"
              render={props => <EditRecipe {...props} recipe={recipe} />}
            />
            <Route
              path="/recipes/:id"
              render={props => <RecipeCard {...props} />}
            />
         
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default withRouter(App);
