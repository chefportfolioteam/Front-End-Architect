import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    // Style sheet name :atom_symbol:
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "black",
        color: "white"
      }
    }
  }
});
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 500
    }
  }
  
}));
const Back = styled.div`
  background: #00ADB5;
  font-size: 1.4rem;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;
const Header = styled.div`
  display: flex;
  margin: 0 0 0 0;
  color: white;
`;
// start of Component
const Signup = props => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: null,
    address: null,
    state: null,
    city: null,
    zipcode: null
  });
  const handleChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://chefportfolio10.herokuapp.com/api/auth/register", newUser)
      .then(res => {
        console.log(res);
        props.history.push("/login");
      }, [])
      .catch(error => console.log(error));
  };
  const cancelSignup = () => {
    window.history.back();
  };
  return (
    <Back>
      {/* <header>
        <img
          className="logo"
          src={require('./FoodLogo.png')}
          alt="Company logo"
        />
      </header> */}
      <Middle>
        <h3 className="signup">Sign Up</h3>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            value={newUser.firstname}
            name="firstname"
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            value={newUser.lastname}
            name="lastname"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            value={newUser.username}
            name="username"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            onChange={handleChange}
            value={newUser.password}
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={handleChange}
            value={newUser.email}
            name="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={handleChange}
            value={newUser.phone}
            name="phone"
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={handleChange}
            value={newUser.address}
            name="address"
            id="outlined-basic"
            label="Address"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={handleChange}
            value={newUser.state}
            name="state"
            id="outlined-basic"
            label="State"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={handleChange}
            value={newUser.city}
            name="city"
            id="outlined-basic"
            label="City"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={handleChange}
            value={newUser.zipcode}
            name="zipcode"
            id="outlined-basic"
            label="Zipcode"
            variant="outlined"
          />
          <br />
          <ThemeProvider theme={theme}>
            <Button type='submit' >Sign Up</Button>
            <br/>
            <Button onClick={cancelSignup} >Cancel</Button>
          </ThemeProvider>
        </form>
      </Middle>
    </Back>
  );
};
export default Signup;
