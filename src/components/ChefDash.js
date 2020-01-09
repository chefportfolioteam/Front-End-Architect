import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Logout from "./Logout";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";



const ChefDash = props => {
    
  const [recipes, setRecipes] = useState([]);
  //get posts from api server using axioswithAuth
  useEffect(() => {
    axiosWithAuth()
      .get(`/auth/user/${localStorage.getItem("userId")}`)
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err.res));
  }, [recipes]);

  //put request for the edit passing post(body)
  //assigning variable that will be passed to editPost

  return (
    <div>
      {/* //Lisa added material ui */}
      <AppBar position="static" color="">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h2">Chef Dashboard</Typography>

          {/* <Button color="inherit" align="right"> <Logout /></Button> */}
        </Toolbar>
      </AppBar>
      {/* //END-Lisa added material ui */}

      <h1>Recipes</h1>

      {recipes.map(item => (
        <Link to={`/recipes/${item.id}`}>{item.recipe_name}</Link>
      ))}
      <Link to="/create">Create Recipe</Link>

      <Logout />
    </div>
    //Have an Add Button and this button
    //will take us to the Add Recipe Form
    //Put an onClick inside the div
  );
};
export default ChefDash;
