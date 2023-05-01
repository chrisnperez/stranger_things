import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Logout = ({ setToken, setUser, token }) => {
    const history = useHistory();

    if (token) {
        const handleLogout = async (event) => {
            event.preventDefault();
            try {
                setToken(null);
                setUser(null)
                history.push('/account/login')
            } catch (err) {
                console.error(err)
            }
        }
        return (
            <>
                <button onClick={handleLogout}>Log Out</button>
            </>
        );
    }
}

export default Logout;