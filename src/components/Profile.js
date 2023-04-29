import react from "react";



const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT/users/`;

const myData = ({ token }) => {

  const handleData = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${BASE_URL}me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
    <h1>Messages</h1>
    <hr></hr>
    
    </>
  )


}



export default myData;