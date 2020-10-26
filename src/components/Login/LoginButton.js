import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    return (
    <div>{user && (<div>{user.name}</div>)}{!isAuthenticated && (<button onClick={() => loginWithRedirect()}>Log In</button>)}</div>
    )
}

export default LoginButton