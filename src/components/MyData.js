import react, { useEffect, useState } from "react";
import Posts from "./Posts";


const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT/users/`;

const MyData = ({ token , setPosts , posts }) => {
  const [myInteractions, setMyInteractions] = useState([]);
 

  const handleData = async () => {


    try {
      const response = await fetch(`${BASE_URL}me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      setMyInteractions(result?.data);
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
        <div className="profilePosts">
          <h1> My Posts </h1>
          <div>
            {<Posts setPosts={setPosts} posts={myInteractions.posts} />}
          </div>
          <div>
          </div>
          <h1>My Messages</h1>

        </div>



      </div>

    </>
  )


}



export default MyData;