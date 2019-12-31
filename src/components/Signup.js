import React, { useState } from "react";
import axios from "axios";





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
    
    e.preventDefault();

    axios
      .post('https://chefportfolio10.herokuapp.com/api/auth/register', newUser)     
      .then(res => {
        console.log("registration res", res)
        localStorage.setItem('token', res.data.token)
        // localStorage.setItem('userId', res.data.user.id)
        props.history.push('/login')
      }, [])
      .catch(error => console.log(error));
  };

  return (
    

      <div className="signup">
        <form onSubmit={handleSubmit} noValidate>
       
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
            type="phone"
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
          <button>Submit</button>
        </form>
      </div>
    
  );
};

export default Signup;