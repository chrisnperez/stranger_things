import React, { useState } from "react";
import CreatePost from "./CreatePost"
import EditPost from "./EditPost";
import DeletePost from "./Delete"
import Message from "./Message";

const Posts = ({ token, user, posts, postsFetch }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts)

    const handleSearch = (event) => {
        const subString = event.target.value;
        setSearchValue(subString);
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(subString.toLowerCase().trim())
            || post.description.toLowerCase().includes(subString.toLowerCase().trim())
        );

        setFilteredPosts(filteredPosts);
    }

    return (
        <>
            <div className="searchContainer">
                <h2>Search: </h2>
                <div>
                    <input
                        className="searchInput"
                        type="text"
                        name="search"
                        onChange={handleSearch}
                        value={searchValue}
                    />
                </div>
            </div>
            <hr></hr>
            {token && <CreatePost token={token} user={user} postsFetch={postsFetch} />}
            <div>
                {
                    posts
                        ? posts.map(
                            ({ _id, isAuthor, author, title, description, price, idx }) => (
                                <div className="postContainer" key={_id ?? idx}>
                                    <h1>{title}</h1>
                                    <h4>Price: {price}</h4>
                                    <h4>Description: {description}</h4>
                                    {(user === !user) && <h5> Seller: {author.username} </h5>}
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
                                            postsFetch={postsFetch} 
                                            filteredPosts={filteredPosts}/>}
                                    {isAuthor && <DeletePost id={_id} token={token} postsFetch={postsFetch} />}

                                </div>
                            )
                        ) : <strong> No Posts Found </strong>
                }
            </div>
        </>
    );

}


export default Posts;