import react from "react";
import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
        <div className="homePageDisplay">
            <h1>Welcome to Stranger's Things!</h1>
            <Link to="/account/login">Log In Here</Link>
        </div>
    )
}

export default HomePage