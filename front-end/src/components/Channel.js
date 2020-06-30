import React, { useRef, useEffect, useState } from 'react';
import Messages from './Messages';
import { useHistory } from 'react-router-dom';
import { TweenMax } from 'gsap';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom'
import Input from './Input'
// import { send } from "../services/messages"
const ENDPOINT = 'http://localhost:5000/';
let socket;
let messageCounter = 0;
const Channel = () => {
    let [allUsers, setAllUsers] = useState([]);
    let [allRooms, setAllRooms] = useState([]);
    const [keyword, setKeyword] = useState("SEND")
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("")
    const [room, setRoom] = useState('');
    const [me, setMe] = useState({})
    const [roomId, setRoomId] = useState(0)
    let { username } = useParams()
    const history = useHistory();

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('join', username)
        socket.on("created", ({ user, room }) => {
            if (!user) history.push("/")
            setMe(user);
            setUserId(user.id);
            setRoom(room)
        })
        socket.emit('getAllRooms');
        socket.on("rooms", ({ rooms }) => {
            setAllRooms(rooms)
        })


        return () => {
            socket.emit("logout")
        }


    }, [ENDPOINT])

    useEffect(() => {
        socket.on('allusers', ({ users }) => {
            setAllUsers(users);
        })

        socket.on('message', ({ user, message, roome }) => {

            if (roome) {
                setRoomId(roome)
            }
            console.log(message, roome)
            setMessages(messages => [...messages, { message, id: messageCounter++, iamSender: username === user.name, user, roomId: roome }]);
        })

        socket.on("nickname", (user) => setMe(user))

        socket.on("changedRoom", room => {
            setRoomId(room.id);
        })


    }, [])



    let lateral = useRef(null);

    useEffect(() => {
        TweenMax.fromTo(lateral, 2, { x: -400 }, { x: 0, delay: 1 })
    }, []);


    //When we send a message
    const send = (e) => {
        e.preventDefault();
        //Push à essayer 
        if (message) {
            console.log(message, roomId)
            socket.emit("sendMessage", { message, roomId })
            setMessage('')
        }
    }
    const create = (roomName) => {
        socket.emit("create", roomName);
    }

    const deleteRoom = (roomName) => {
        socket.emit("delete", roomName);
    }

    const nickname = (nickname) => {
        socket.emit("nickname", nickname);
    }
    const join = (roomName) => {
        socket.emit("joinRoom", { roomName, roomId });
    }

    const list = (name) => {
        socket.emit("list", name);
    }

    const users = (roomName) => {
        socket.emit("listUsers", roomName);

    }
    return (
        <div className="entierePage">
            <div className="row">

                <div ref={element => { lateral = element }} className="lateralComponent col-sm-12 col-md-3 col-lg-1">
                    <div className="channelLateral">
                        <h5>CHANNEL</h5>
                        {allRooms && allRooms.map(room => <p key={room.id} className={room.id == roomId ? "text-primary" : ""}>
                            {room.name}
                        </p>)}

                    </div>
                    <hr></hr>

                    <div className="userLateral">
                        <h5>USERS</h5>
                        <p className="text-primary">
                            {me.name}
                        </p>
                        {allUsers && allUsers.map(user => user.id != me.id && (<p key={user.id} className={user.id === me.id ? "text-primary" : ""}>
                            {user.name}
                        </p>))}
                    </div>
                </div>

                <div className="channelComponent col-sm-12 col-md-9 col-lg-10">
                    <h1>HOME</h1>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-11 tchatContainer">
                                {messages && <Messages messages={messages} roomId={roomId} />
                                }
                                <div className="sendContainer">
                                    <Input message={message}
                                        setMessage={setMessage}
                                        send={send}
                                        keyword={keyword}
                                        create={create}
                                        deleteRoom={deleteRoom}
                                        nickname={nickname}
                                        join={join}
                                        list={list}
                                        users={users} />
                                    {/* {keyword && (<button className="btn btn-warning">{keyword}</button>
                                    )} */}
                                    <button type="button" className="btn btn-dark" id="modalBtn" data-toggle="modal" data-target="#myModal">?</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">CHAT COMMAND</h4>
                            </div>
                            <div className="modal-body">
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("nickname")} >/nicknickname: </button> <p> Define the name of the user within the server</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("list")} >/list[string]:</button>  <p> Lists the channels available on the server. Only display channels containing the string "string" if this is specified.</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("create")} >/createchannel:</button> <p> Create a channel on the server.</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("delete")} >/deletechannel:</button> <p> Removal of the channel on the server.</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("join")} >/joinchannel:</button> <p>Joined a channel on the server</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("leave")} >partchannel:</button> <p> Leave the channel</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("users")} >/users:</button> <p> Lists the users connected to the channel.</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("msgto")} >/msgnickname message:</button><p> Send a message to a specific user.</p>
                                <button type="button" data-dismiss='modal' className="btn btn-warning" onClick={() => setKeyword("send")} >message:</button> <p> Sends a message to all users connected to the channel.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Channel;