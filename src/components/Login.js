import React, {useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Loader from 'react-loader-spinner'


export const Login = props => {
   
    const [data, setData] = useState({
        username: '',
        password: '',
        
    })


const handleChange = e => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
}
    
const handleSubmit = e => {
    e.preventDefault();
    console.log('Login data', data);
    axiosWithAuth()
    .post('/auth/login', data)
    .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id)
        props.history.push('/chefdash')

    })
    .catch(err => console.log(err))
   }
  


    return(
        <div>
            {/* {!props.Login && !props.loading && <p>Loading...</p>} */}
            {/* {props.loading && (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      )} */}
            <form onSubmit={handleSubmit}>
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
                    <button type='submit'>Log In</button>
                    
            </form>
        </div>
    )
    
}