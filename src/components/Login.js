import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { AuthContext } from "../Contexts/AuthContext";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const Back = styled.div`
  background: #00ADB5;
  width: 100%;
  height: 100%;
`;
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
export const Login = props => {
  const classes = useStyles();
  const { cancelItem } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/auth/login", data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        // console.log(data)
        props.history.push("/chefdash");
      })
      .catch(err => console.log(err));
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
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          onChange={handleChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          onChange={handleChange}
        />
        <br />
        <ThemeProvider theme={theme}>
          <Button type='submit' >Log In</Button>
          <br/>
          <Button onClick={cancelItem} >Cancel</Button>
        </ThemeProvider>
      </form>
    </Back>
  );
};
