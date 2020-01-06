import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";






// start of Component

const Signup = props => {
  const { register, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
 
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
    

      <div className="signup">
        <form onSubmit={handleSubmit(onSubmit)} >
       
        <h3>Sign-Up</h3>
          <input
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={newUser.firstname}
            type="text"
            ref={register({required: true, maxLength: 20})}
          />        
          <input
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={newUser.lastname}
            type="text"
            ref={register({required: true, maxLength: 20})}
          />
          <br/>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={newUser.username}
            type="text"
            ref={register({required: true, maxLength: 10})}         
          /> 
               
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={newUser.password}
            type="password"
            ref={register({required: true, min: 3, maxLength: 12})}
          />
           
          <br/>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={newUser.email}
            type="email"
            ref={register({required: true, min: 5, maxLength: 20})}
          />
           
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={newUser.phone}
            type="tel"
            ref={register}
          />
          <br/>
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={newUser.address}
            type="text"
            ref={register}
          />
          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
            value={newUser.state}
            type="text"
            ref={register}
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={newUser.city}
            type="text"
            ref={register}
          />          
          <br/>        
          <input
            name="zipcode"
            placeholder="Zip Code"
            onChange={handleChange}
            value={newUser.zipcode}
            type="text"
            ref={register}
          />
          <br/>        
          <button>Submit</button>
         
        </form>
        <button onClick={cancelSignup} >Cancel</button>
      </div>
    
  );
};

export default Signup;