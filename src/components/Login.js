import React, {useState, useContext } from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {AuthContext} from'../Contexts/AuthContext'
import styled from 'styled-components'



const Back = styled.div `

background: #00ADB5;
width:100%;
height:100%;

`

const Movin = styled.form`

display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;
color: white;
background: black;
width: 200px;
height: 150px;
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

`;

export const Login = props => {
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
  }  
    return(
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
            <Movin onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    value={data.username}
                    onChange={handleChange}
                    placeholder='Username'
                    />
                    <br/>
                    <input
                        type='password'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        placeholder='Password'
                    />
                    <br/>
                    <Submit type='submit' >Log In</Submit>
            </Movin>
            </Middle>
        </Back>
    )
    
}
