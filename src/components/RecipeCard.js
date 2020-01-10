import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { EditContext } from "../Contexts/EditContext";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//import { flexbox } from "@material-ui/system";

const useStyles = makeStyles({
  card: {
    margin: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 500,
    minWidth: 275,
    backgroundColor: "primary"
  },

  title: {
    fontSize: 30
  },
  pos: {
    marginBottom: 120
  }
});

const RecipeCard = props => {
  const { deleteRecipe, editinfo, recipe, cancelItem } = useContext(
    AuthContext
  );
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  useEffect(() => {
    editinfo(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!recipe) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <EditContext.Provider value={{ recipe }}>
        {/* <div>
          <span>{recipe.recipe_name}</span>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <button onClick={cancelItem}>Cancel</button>
        </div> */}

        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <span>{recipe.recipe_name}</span>
            </Typography>
            <Typography variant="h5" component="h2">
              <p>{recipe.ingredients}</p>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <p>{recipe.instructions}</p>
            </Typography>
          </CardContent>
          <CardActions>
            {localStorage.getItem("token") && (
              <Link to={`/edit-recipe/${props.match.params.id}`}><button>Update</button></Link>
            )}

            
              <button onClick={cancelItem}>Cancel</button>
           
            {localStorage.getItem("token") && (
              <button
                onClick={e => {
                  deleteRecipe(props.match.params.id);
                  props.history.push("/chefdash");}}>Delete </button>
            )}
          </CardActions>
        </Card>
      </EditContext.Provider>
    </div>
  );
};
export default RecipeCard;
