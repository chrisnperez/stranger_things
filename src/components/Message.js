import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT/posts`;

const Message = ({ token, _id }) => {
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState("none")
    const [messageId, setMessageID] = useState("");

    const postMessage = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/${messageId}/messages`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: {
                        content: message
                    }
                })
            });
            const result = await response.json();
            return result
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div style={{ display: display }}>
                <form onSubmit={postMessage}>
                    <div className="messageForm">
                        <textarea
                            type="textarea"
                            required
                            label="Message"
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                        />
                    </div>

                    <button className="sendButton" type="submit">Send Message</button>
                </form>

            </div>
            <button
                className="messageButton"
                type="submit"
                onClick={() => {
                    setMessageID(_id);

                    display === "none" ? setDisplay('block')
                        : setDisplay("none");

                }}>{
                    display === "none" ? "Message User"
                        : "Cancel Message"

                }</button>

        </>
    )

}

export default Message;