import React from 'react'
import { checker } from '../services/commands';
// import { listUsers } from '../../../back-end/services/room';
function Input({ list, users, join, message, setMessage, send, keyword, create, deleteRoom, listUsers, nickname }) {
    const checker = (message) => {
        const commands = ['nick', 'list', 'create', 'delete', 'join', 'parts', 'users', 'msg'];
        for (let i = 0; i < commands.length; i++) {
            const regex = new RegExp(`(\/${commands[i]}) ([a-z]+)`);
            const found = message.match(regex)
            if (found) return found;

        }
    }
    const handleSend = (e) => {
        e.preventDefault();

        const found = checker(message)

        if (!found) {
            return send(e)
        }
        switch (found[1]) {

            case '/nick':
                nickname(found[2])
                break;
            case '/list':
                list(found[2])
                break;
            case '/create':
                create(found[2]);
                console.log("create")
                break;
            case '/delete':
                e.preventDefault()
                deleteRoom(found[2])
                console.log("delete")
                break;
            case '/join':
                join(found[2]);
                console.log("join")
                break;
            case '/parts':
                e.preventDefault()

                console.log("parts")
                break;
            case '/users':
                e.preventDefault()
                users();
                console.log("users")
                break;
            case '/msg':
                e.preventDefault()

                console.log("msg")
                break;

        }
    }


    const handleChange = (e) => {
        e.preventDefault();
        const message = e.target.value;


        // let regex = /(\/channel) ([a-z]+)/;
        // const found = message.match(regex);
        // console.log(found)
        setMessage(e.target.value)
    }



    return (
        <form>
            <input
                type="text"
                className=""
                placeholder="Send your message..."
                value={message}
                onChange={handleChange}
            />
            <button className="btn btn-dark" onClick={handleSend}>{keyword.toUpperCase()}</button>
        </form>
    )
}

export default Input
