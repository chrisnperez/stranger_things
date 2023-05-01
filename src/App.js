import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import {
    Posts,
    AccountForm,
    Logout,
    MyData,
    HomePage
} from './components';

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;


const App = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    }, [token, user])

    const postsFetch = async () => {
        try {
            const response = await fetch(`${BASE_URL}/posts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            const results = await response.json()
            if (results.error) throw new Error("SERVER ERROR: " + results.error.message);
            setPosts(results.data.posts);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        postsFetch();
    }, [token]);

    return (
        <>
            <nav className='navBar'>
                <Link to="/">Home</Link> |
                <Link to="/posts">Posts</Link> |
                <Link to="/profile">Profile</Link> |
                <Link to="/account/login">Account</Link>
            </nav>

            <Route exact path="/">
               <HomePage />
            </Route>
            <Route path="/posts">
                <h1> Posts </h1>
                <Posts token={token} user={user} posts={posts} postsFetch={postsFetch} />
            </Route>
            <Route path="/profile">
                {token ? <h1>My Profile</h1> :
                    <h1>Profile</h1>}
                <Logout setToken={setToken} setUser={setUser} token={token} />
                <hr></hr>
                <MyData token={token} setPosts={setPosts} posts={posts} />

            </Route>
            <Route path="/account/:actionType" >
                <AccountForm setToken={setToken} token={token} setUser={setUser} />
            </Route>
        </>
    )
}

export default App; 