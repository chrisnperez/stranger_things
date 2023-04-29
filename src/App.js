import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import {
    Posts,
    AccountForm,
    Logout, 
    MyData
} from './components';



const App = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [postId, setPostId] = useState(null)

    useEffect(() => {
        console.log('TOKEN: ' + token);
        console.log('USER: ' + user)
    }, [token, user])

    return (
        <>
            <nav className='navBar'>
                <Link to="/">Home</Link> |
                <Link to="/posts">Posts</Link> |
                <Link to="/profile">Profile</Link> |
                <Link to="/account/login">Account</Link>
            </nav>

            <Route exact path="/">
                <h1>Home</h1>
            </Route>
            <Route path="/posts"> 
                <Posts token={token} user={user} postId={postId} setPostId={setPostId}/>
            </Route>
            <Route path="/profile">
                {token ? <h1>My Profile</h1> :
                <h1>Profile</h1> }
                <hr></hr>
                <MyData token={token}/>
                <Logout token={token} setToken={setToken} setUser={setUser} />
            </Route>
            <Route path="/account/:actionType" >
                <AccountForm setToken={setToken} token={token} setUser={setUser} />
            </Route>
        </>
    )
}



export default App; 