import React from 'react'
import Message from './Message'
function Messages({ messages, roomId }) {
    return (
        <div className="messagesContainer">
            {messages && messages.map((message) => message.roomId === roomId && (<Message key={message.id} message={message} />)
            )}
        </div>
    )
}

export default Messages
