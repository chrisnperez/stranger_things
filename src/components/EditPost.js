import react, { useState } from "react";

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;

const EditPost = ({token , id}) => {
    const [postId , setPostId] = useState('')

    const updatePost = async (event) => {
        event.preventDefault();

        try {
          // You will need to insert a variable into the fetch template literal 
          // in order to make the POST_ID dynamic. 
          // 5e8d1bd48829fb0017d2233b is just for demonstration.
    
          const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title: "My favorite stuffed animal",
                description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
                price: "$480.00",
                location: "New York, NY",
                willDeliver: true
              }
            })
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }

      return (
        <>
        <div>
            <button onClick={updatePost}>Edit</button>
        </div>
        </>
      )
      

}

export default EditPost