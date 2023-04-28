import React from "react";
import { useEffect, useState } from "react";

import CreatePost from "./CreatePost"
import EditPost from "./EditPost";

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;

const Posts = ({ token, user }) => {
    const [posts, setPosts] = useState([])

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
            console.log(results.data.posts)
            if (results.error) throw new Error("SERVER ERROR: " + results.error.message);
            setPosts(results.data.posts)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        postsFetch();
    }, [token]);

    return (
        <>
            <h1> Posts </h1>
            <hr></hr>
            {token && <CreatePost token={token} user={user} postsFetch={postsFetch} />}
            <div>
                {
                    posts
                        ? posts.map(
                            ({ _id, isAuthor, author, title, description, price, idx }) => (
                                <div key={_id ?? idx}>
                                    <h1>{title}</h1>
                                    <h4>Price: {price}</h4>
                                    <h4>Description: {description}</h4>
                                    <h5> Seller: {author.username} </h5>
                                    {isAuthor && <h5>Posted By Me</h5>}
                                    {isAuthor && <EditPost id={_id} token={token} postsFetch={postsFetch} />}
                                </div>
                            )
                        ) : <strong> ERROR </strong>
                }
            </div>
        </>
    );


}


export default Posts;