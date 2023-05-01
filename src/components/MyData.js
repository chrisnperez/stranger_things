import react, { Fragment, useEffect, useState } from "react";
import MyPosts from "./MyPosts";

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT/users/`;

const MyData = ({ token, setPosts, user }) => {
  const [myInteractions, setMyInteractions] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleData = async () => {
    try {
      const response = await fetch(`${BASE_URL}me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      setMyInteractions(result?.data);
      setMessages(result?.data?.messages)
      return result
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    handleData();
  }, [])

  return (
    <>
      <div>
        <div className="profileMessages">
          <h1>Message Center</h1>
          {messages
            ? messages.map(
              ({ content, fromUser, post, _id, idx }) => (
                <div className="messageBorder">
                  <div className="myMessages" key={_id ?? idx}>
                    <h3>{post.title}</h3>
                    {(user === !user) ? <h4> To: {fromUser.username}</h4> : <h4> To: {post.author.username}</h4>}
                  </div>
                  <div className="messageContent">
                    <p> Message: {content}</p>
                  </div>
                </div>
              )
            ) : <p> Login to see messages! </p>
          }
        </div>
        <div className="profilePosts">
          <h1> My Posts </h1>
          <div className="myPostContainer">
            {(token ?
              <MyPosts setPosts={setPosts} posts={myInteractions.posts} user={user} />
              : "Login to see your posts!")}
          </div>
        </div>
      </div>
    </>
  )
}


export default MyData;