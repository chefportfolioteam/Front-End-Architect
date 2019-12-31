import React from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component  {
    state = {
        navigate: false
    }
    logout = () => {
        localStorage.clear('token')
        this.setState({ navigate: true })
    }
    render() {
        const { navigate } = this.state

        if (navigate) {
            return <Redirect to='/' push={true} />
        }

    return <button onClick={this.logout}>Log Out</button>
            
        
    
    }
}
export default Logout;