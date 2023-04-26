

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;

const API_ENDPOINTS = {
    register: "/users/register",
    login: "/users/login"
}

const fetchSourceAPI = async({}) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const response = await fetch(
            BASE_URL + actionType, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
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
        setToken(result?.data.token);
        setPassword('');
        setUsername('');
        return result
    } catch (err) {
        console.error(err);
    }
}
