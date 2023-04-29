import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoggedIn from "./LoggedIn"

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT/users/`;


const AccountForm = ({ setToken, setUser, token }) => {
    const params = useParams();
    const { actionType } = params
    const history = useHistory();
    console.log(params)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                BASE_URL + actionType, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            });

            const result = await response.json();
            console.log(result);
            const { token } = result?.data;
            setPassword('');
            setUsername('');
            setToken(token);

            if (token) {
                try {
                    const response = await fetch(BASE_URL + 'me', {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            ...(token && { 'Authorization': `Bearer ${token}` })
                        },
                    });
                    const result = await response.json();
                    console.log(result);
                    const confirmedUser = result?.data?.username
                    setPassword('');
                    setUsername('');
                    setUser(confirmedUser)
                    history.push('/profile')
                    return result
                } catch (err) {
                    console.error(err);
                }
            }
            return result
        } catch (err) {
            console.error(err);
        } finally {
            if (token) {
                setPassword('');
                setUsername('');
                return LoggedIn()
            }
        }
    }

    return (
        <>
            <h1>{actionType === "register" ? "Sign Up" : "Log In"}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        required
                        label="Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        required
                        label="Password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">{actionType === 'register' ? "Register" : "Log In"}</button>
                {actionType === "register"
                    ? <Link to="/account/login">Already have an account? Log In here.</Link>
                    : <Link to="/account/register">Need an account? Register here.</Link>
                }
            </form>
        </>
    );

}


export default AccountForm
