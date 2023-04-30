import react, { useState } from "react";


const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;

const EditPost = ({ token, id, title, description, price, postsFetch }) => {
    const [display, setDisplay] = useState("none")
    const [editTitle, setEditTitle] = useState(title);
    const [editPrice, setEditPrice] = useState(price);
    const [editDescription, setEditDescription] = useState(description);

    const updatePost = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/posts/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    post: {
                        title: editTitle,
                        description: editDescription,
                        price: editPrice,
                        willDeliver: true
                    }
                })
            });
            const result = await response.json();
            console.log(result);
            setDisplay("none")
            await postsFetch(token);
            return result
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div style={{ display: display }}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        required
                        label="Title"
                        value={editTitle}
                        onChange={event => setEditTitle(event.target.value)}
                    />
                </div>
                <label htmlFor="description">Description: </label>
                <input
                    required
                    label="Description"
                    value={editDescription}
                    onChange={event => setEditDescription(event.target.value)}
                />
                <label htmlFor="price">Price: </label>
                <input
                    required
                    label="Price"
                    value={editPrice}
                    onChange={event => setEditPrice(event.target.value)}
                />
                <button onClick={updatePost}>Submit</button>
            </div>
            <button className="editButton" onClick={() => {
                display === "none" ? setDisplay("block")
                    : setDisplay("none");
            }}>{display === "none" ? "Edit"
                    : "Cancel"}</button>


        </>
    )


}

export default EditPost
