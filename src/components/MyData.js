import react, { useEffect, useState } from "react";
import Posts from "./Posts";



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
      // console.log(result);
      // console.log(result?.data?.messages);
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

  console.log(myInteractions)
  console.log(messages)

  return (
    <>
      <div>
        <div className="profilePosts">
          <h1> My Posts </h1>
          <div>
            {(token ? <Posts setPosts={setPosts} posts={myInteractions.posts} user={user} /> : "Login to see your posts!")}
          </div>
          <div>


          </div>
          <h1>Message Center</h1>
          <div>
            {messages
              ? messages.map(
                ({ content, fromUser, post, _id, idx }) => (
                  <div key={_id ?? idx}>
                    <h3>Subject: {post.title}</h3>
                    {(user === !user) ? <h4> To: {fromUser.username}</h4> : <h4> From: {fromUser.username}</h4>}
                    <p> Message: {content}</p>
                  </div>
                )
              ) : <strong> Error </strong>}

          </div>

        </div>



      </div>

    </>
  )


}



export default MyData;