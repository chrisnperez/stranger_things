import React from "react";

import CreatePost from "./CreatePost"
import EditPost from "./EditPost";
import DeletePost from "./Delete"
import Message from "./Message";

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;

const Posts = ({ token, user, posts, postsFetch }) => {
  
    return (
        <>
            
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
                                    {!isAuthor && token && (
                                        <Message token={token} isAuthor={isAuthor} _id={_id} />
                                    )
                                    }
                                    {isAuthor && <h5>Posted By Me</h5>}
                                    {isAuthor &&
                                        <EditPost
                                            title={title}
                                            description={description}
                                            price={price}
                                            id={_id}
                                            token={token}
                                            postsFetch={postsFetch} />}
                                    {isAuthor && <DeletePost id={_id} token={token} postsFetch={postsFetch} />}

                                </div>
                            )
                        ) : <strong> ERROR </strong>
                }
            </div>
        </>
    );


}


export default Posts;