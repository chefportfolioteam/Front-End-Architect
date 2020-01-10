import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { EditContext } from "../Contexts/EditContext";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//import { flexbox } from "@material-ui/system";

const useStyles = makeStyles({
  card: {
    margin: 0,
    justifyContent: "center",
    flexDirection: "row",
    width: 600,
    height: 500,
    maxWidth: 600,
    minWidth: 275,
    boxShadow: '0 5px 7px 2px rgba(255, 105, 135, .3)',
    flexGrow: 1,
  },

  title: {
    fontSize: 40,
    color: 'Bondi Blue'
  },
  pos: {
    marginBottom: 100
  },
  

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
    <div className='recipe-card-wrapper' >
        
    <EditContext.Provider value={{ recipe }}>
        <Card className={classes.card} variant="outlined">
        <button className='cancel-button' variant='contained' onClick={cancelItem}>Cancel</button>
        {localStorage.getItem("token") && (
              <button className='delete-button'
                onClick={(e) => {
                  deleteRecipe(props.match.params.id);
                  props.history.push("/chefdash");}}>Delete </button>
            )}
        {localStorage.getItem("token") && (
            
              <Link to={`/edit-recipe/${props.match.params.id}`}><button className='update-button' >Update</button></Link>
              
            )}
          <CardContent>
            <Typography
              className={classes.title}
              color="textPrimary"
              component="h3"
              gutterBottom
            >
              <div>{recipe.recipe_name}</div>
            </Typography>
            <Typography variant="h7" component="h4" color="textSecondary" >
              <p>{recipe.ingredients}</p>
            </Typography>
            <Typography  className={classes.pos} color="textSecondary" variant="h7" component="h5" >
              <p>{recipe.instructions}</p>
            </Typography>
            
          </CardContent>
          <CardActions>
          
            

            
              
           
            
           
          </CardActions>
        </Card>
    </EditContext.Provider>
    </div>
  );
};
export default RecipeCard;
