import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import pictures from '../images'
import SearchRecipe from './SearchRecipe';
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
    minWidth: 800,
    backgroundColor: "primary"
  },

  title: {
    fontSize: 30
  },
  pos: {
    marginBottom: 120
  },
  paper: {
    padding: "2vw",
    textAlign: "center",
    color: "#000000",
    whiteSpace: "nowrap",
    background: "#A0DB9E",
    marginTop: "2vh",
    marginBottom: "2vh"
}});


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
        <>
            
            <SearchRecipe setSearchRecipes={setSearchRecipes} recipes={recipes}/>


            {localStorage.getItem('token')? null :
                <nav>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
                </nav>
                }
             
    <Grid >
      <CardActions>
      
        
        {searchRecipes.map((item, index) => (
          <Card>
            
              <Link key={index} to={`/recipes/${item.id}`}>
                <br />
                {<img src={pictures[index]} alt="food" />}
                <br />

                <br />
              </Link>
            

            <Typography
              className={useStyles.title}
              color="textSecondary"
              gutterBottom
            ></Typography>

            <Typography
              className={useStyles.pos}
              color="textSecondary"
              variant="h4"
            >
              <span> {item.recipe_name}</span>
            </Typography>
            <Typography variant="h5" component="h2">
              <span> {item.mealtype}</span>
            </Typography>
            
          </Card>
          
        ))}
        
         
      </CardActions>

      {localStorage.getItem("token") ? null : (
        <nav>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      )}
    </Grid>
    </>
  );
};
export default UserDash;
