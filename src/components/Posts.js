import React from "react";
import { useEffect, useState } from "react";

const COHORT_NAME = '2301-FTB-PT-WEB-PT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Posts = () => {
    const [posts, setPosts] = useState([])

    const postsFetch = async () => {
        try {
            const response = await fetch(`${BASE_URL}/posts`)
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
    }, []);

    return (
        <>
            <div>
                {
                    posts
                        ? posts.map(
                            ({ _id, author, title, description, price, idx }) => (
                                <div key={_id}>
                                    <h1>{title}</h1>
                                    <h4>Price: {price}</h4>
                                    <h4>Description: {description}</h4>
                                    <h5> Seller: {author.username} </h5>
                                </div>
                            )
                        ) : <strong> ERROR </strong>
                }
            </div>
        </>
    );


}


export default Posts;