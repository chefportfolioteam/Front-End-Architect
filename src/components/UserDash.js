import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import SearchRecipe from "./SearchRecipe";
import pictures from "../images";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    margin: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 100,
    minWidth: 275,
    backgroundColor: "primary"
  },

  // bullet: {
  //   display: "inline-block",
  //   margin: "0 2px",
  //   transform: "scale(0.8)"
  // },
  title: {
    fontSize: 30
  },
  pos: {
    marginBottom: 120
  }
});

const UserDash = props => {
  const [recipes, setRecipes] = useState([]);
  const [searchRecipies, setSearchRecipies] = useState([]);
  useEffect(() => {
    axios
      .get("https://chefportfolio10.herokuapp.com/api/recipes")
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err.res));
  }, []);

  return (
    <div>
      <Card className={useStyles.card} variant="outlined">
        <CardContent>
          <Typography
            className={useStyles.title}
            color="textSecondary"
            gutterBottom
          >
            {/* <span>{recipe.recipe_name}</span> */}
          </Typography>
          <Typography variant="h5" component="h2">
            {/* <p>{recipe.ingredients}</p> */}
          </Typography>
          <Typography className={useStyles.pos} color="textSecondary">
            {/* <p>{recipe.instructions}</p> */}
          </Typography>
        </CardContent>
        <CardActions>
          {searchRecipes.map((item, index) => (
            <Link key={index} to={`/recipes/${item.id}`}>
              {item.mealtype}
              <br />
              {<img src={pictures[item.id]} alt="food" />}
              <br />
              {item.recipe_name}
              <br />
            </Link>
          ))}
        </CardActions>
      </Card>

      {localStorage.getItem("token") ? null : (
        <nav>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      )}
    </div>
  );
};
export default UserDash;
