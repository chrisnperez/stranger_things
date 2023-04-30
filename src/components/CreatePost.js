import react, { useState } from "react";

const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`;

const CreatePost = ({ token, postsFetch }) => {
    const [display, setDisplay] = useState("none")
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/posts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        willDeliver: true,
                    }
                })
            });
            const result = await response.json();
            setTitle('');
            setPrice('');
            setDescription('');
            await postsFetch(token);
            return result
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <div style={{ display: display }}>

                <form
                    className="createPostContainer"
                    onSubmit={handleSubmit}>
                    <div >
                        <label htmlFor="title">Title: </label>
                        <input
                            required
                            label="Title"
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </div>
                    <label htmlFor="description">Description: </label>
                    <div>
                        <textarea
                            className="postForm"
                            type="textarea"
                            required
                            label="Description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </div>

                    <div className="priceInput">
                        <label htmlFor="price">Price: </label>
                        <input
                            required
                            label="Price"
                            value={price}
                            onChange={event => setPrice(event.target.value)}
                        />
                    </div>
                    <button className="postButton" type="submit">Post</button>
                </form>
            </div>
            <button className="createPostButton" type="submit" onClick={() => {
                display === "none" ? setDisplay('block')
                    : setDisplay("none")
            }}>{
                    display === "none" ? "Create Post"
                        : "Cancel Post"}</button>

        </>
    )
}

export default CreatePost