import react from "react";

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;

const DeletePost = ({ token , postsFetch , id }) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            console.log(result);
            await postsFetch()
            return result
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

}

export default DeletePost


