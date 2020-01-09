import React, { useState } from "react";
import styled from 'styled-components'
import axios from "axios";


const Back = styled.div `

background: #00ADB5;



`

const Login = styled.form`

display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;
color: white;
background: black;
width: 200px;
height: 390px;
border-radius: 10px;
padding: 30px;
font-family: 'Spicy Rice', cursive;
`

const Middle= styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 30px;


`

const Submit = styled.button`

background: #00ADB5;
color:white;

`
const Header=styled.div`
background:black
display:flex;
margin: 0 0 0 0;
color:white;

`



// start of Component

const Signup = props => {
  
  
 
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
    })
  };

  const handleSubmit = e => {    
   e.preventDefault()
    axios
      .post('https://chefportfolio10.herokuapp.com/api/auth/register', newUser)     
      .then(res => {
        console.log("registration res", res)
        props.history.push('/login')
      }, [])
      
      .catch(error => console.log(error));
      
  };
  const cancelSignup = () => {
    window.history.back();
  };
  return (
    

      <Back>
        <Header>
        
          <img class="logo" src="http://josefetheridge.com/marketing-page/img/Blk_Bkgrd_Nav1.png" alt="Company logo"/>
        
                  <div class="main-nav">
                      <p>Home</p>
                      <p>About</p>
                      <p>Contact</p>
                      <p><a href="https://front-end-architect-fuh3xh1sq.now.sh/">Login</a></p>
                  </div>
        </Header>
        <Middle>
        <Login onSubmit={handleSubmit} >
       
        <h3>Sign-Up</h3>
      
          <input
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={newUser.firstname}
            type="text"
           
          />        
          <input
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={newUser.lastname}
            type="text"
            
          />
          <br/>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={newUser.username}
            type="text"
                     
          /> 
               
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={newUser.password}
            type="password"
            
          />
           
          <br/>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={newUser.email}
            type="email"
            
          />
           
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={newUser.phone}
            type="tel"
            
          />
          <br/>
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={newUser.address}
            type="text"
            
          />
          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
            value={newUser.state}
            type="text"
            
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={newUser.city}
            type="text"
            
          />          
          <br/>        
          <input
            name="zipcode"
            placeholder="Zip Code"
            onChange={handleChange}
            value={newUser.zipcode}
            type="text"
            
          />
          <br/>        
          <Submit>Submit</Submit>
         
        </Login>
        </Middle>
      </Back>
    
  );
};

export default Signup;