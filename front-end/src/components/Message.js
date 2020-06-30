// eslint-disable-next-line
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line
import { TweenMax, Power0 } from 'gsap';
import ReactEmoji from 'react-emoji';

const Message = ({ message }) => {
    const classe = message.iamSender ? "message" : "messageGrey";
    return (
        <div className={classe + "Component col-sm-12"}>
            <div className={classe + "Block"}>
                <p> {ReactEmoji.emojify(message.message)} </p>
            </div>

            <div className={classe + "nameContainer"}>
                <p>{message.user.name}</p>
            </div>
        </div >
    );
};

export default Message;