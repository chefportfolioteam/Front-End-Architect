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
    minWidth: 400,
    boxShadow: '0 5px 7px 2px rgba(255, 105, 135, .3)',
     
  },


});


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
        <div className='userdash-header' />  
            
            <SearchRecipe  setSearchRecipes={setSearchRecipes} recipes={recipes}/>


            {localStorage.getItem('token')? null :
                <nav>
                <Link  to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
                </nav>
                }
             
    <Grid >
      <CardActions>        
        {searchRecipes.map((item, index) => (
          <Card>
              <Typography 
              className={useStyles.title}
              color="textPrimary"
              component="h4"
              variant="h7"
              gutterBottom
            >
            <span> {item.recipe_name}</span>
            </Typography>
            
              <Link  key={index} to={`/recipes/${item.id}`}>
                <br />
                {<img src={pictures[index]} alt="food" />}
                <br />

                <br />
              </Link>
            <Typography variant="h5" component="h2"color="textPrimary" >
              <span> {item.mealtype}</span>
            </Typography>            
          </Card>       
        ))}         
      </CardActions>      
    </Grid>
    </>
  );
};
export default UserDash;
