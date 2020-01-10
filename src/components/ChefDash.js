import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import pictures from "../images";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    margin: 100,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    minWidth: 400,
    boxShadow: "0 5px 7px 2px rgba(255, 105, 135, .3)"
  },
  
});

const ChefDash = props => {
  const [recipes, setRecipes] = useState([]);
  //get posts from api server using axioswithAuth
  useEffect(() => {
    const abortController = new AbortController();
    const signal = AbortController.signal;
    axiosWithAuth()
      .get(`/auth/user/${localStorage.getItem("userId")}`, { signal: signal })
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err.res));
    return function cleanup() {
      abortController.abort();
    };
  }, [recipes]);

  return (
    <>
      <h1>Chef DashBoard</h1>
      <h1>Your Recipes</h1>
      <Logout />
      <Grid>
        <CardActions>
          {recipes.map((item, index) => (
            <Card>
              <Typography
                className={useStyles.title}
                color="textPrimary"
                component="h3"
                variant="h6" 
                gutterBottom
              >
                <span> {item.recipe_name}</span>
              </Typography>

              <Link key={index.id} to={`/recipes/${item.id}`}>
                
                {<img src={pictures[index]} alt="food" />}
                           
              </Link>

              <Link to="/create">Create Recipe</Link>

              
              <Typography variant="h5" component="h2" color="textPrimary">
                <span> {item.mealtype}</span>
              </Typography>
            </Card>
          ))}
        </CardActions>
      </Grid>
    </>
  );
};
export default ChefDash;
