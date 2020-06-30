const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const { addUser,
  listUsers,
  getRoom,
  getRoomByName,
  removeRoom,
  createRoom,
  getRooms,
  removeRoomByName,
  listRooms,
  changeUsernameInRoom } = require("./services/room")

const { getUser,
  removeUser,
  createUser,
  getUsers,
  changeUsername } = require("./services/user")


const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());

app.get('/', (req, res) => {
  res.send({ response: "server ok" }).status(200);
})


const id = 12;
const { error, user, room } = createUser(id, "Jo&Zk");
const admin = user;
io.on('connect', (socket) => {
  /* ADMIN SUPER USER */


  /**When a user joins */
  socket.on("join", name => {
    //An User joined our room //Accueil default

    const { error, user, room } = createUser(socket.id, name)
    const allUsers = getUsers();

    if (error) {
      // WE MUST DISCONNECT THE USER
    } else {
      //user has been created
      socket.emit("created", { user, room })
      socket.join(room.name)
      //emit message to wel<come the user
      //

      socket.emit("message", { roome: room.id, user: admin, allUsers: allUsers, message: `Welcome ${user.name} to ${room.name} ` })
      socket.broadcast.to(room.name).emit("message", { user: admin, message: `Ayy ${user.name} has joined ${room.name}` })
      io.to(room.name).emit("allusers", { users: room.users })
      // Broadcast on the joined room  "User Joined Room"
      // -------> /user/room
      //console.log(user, room, allUsers);
      //EMMIT THE NUMBER OF CONNECTED USERS
      //EMIT THE LIST OF CONNECTED USERS

      // socket.emit("allUsers", { allUsers: allUsers, message: `Welcome` });

    }
  })
  // Change nickname
  socket.on("nickname", nickname => {
    socket.emit("nickname", changeUsername(nickname, socket.id))
  })
  socket.on("getAllUsers", (userId) => {
    //console.log("i'm getting all the users")
    const users = getUsers();

    socket.emit('users', { users })
  })
  socket.on("getUsersInRoom", (userId, roomId) => {
    // const user = getUser(socket.id);
    const users = getUsers();
    socket.emit('users', { users })
  })
  socket.on("getAllRooms", () => {
    const rooms = getRooms();
    socket.emit('rooms', { rooms })
  })

  /**When a user send a message */
  socket.on("sendMessage", ({ message, roomId }) => {
    const room = getRoom(roomId)
    const user = getUser(socket.id)
    console.log(message)
    io.to(room.name).emit("message", { user, message, roome: 0 })
  })

  /** CREATE A ROOM */
  socket.on("create", (roomName) => {
    const user = getUser(socket.id);
    createRoom(roomName, user);
    const rooms = getRooms();
    socket.emit('rooms', { rooms })
  })

  socket.on("delete", (roomName) => {
    const user = getUser(socket.id);
    console.log(removeRoomByName(roomName, user.id));
    const rooms = getRooms();
    socket.emit('rooms', { rooms })
  })

  /**LIST ALL ROOMS THAT WONTAINS A WORD */
  socket.on("list", (contains) => {
    const rooms = listRooms(contains);
    let message = ""
    for (let i = 0; i < rooms.length; i++) {
      message = message + rooms[i].name + " - ";
    }
    if (message === "") {
      message = "No room contains " + contains;
    }
    io.to(socket.id).emit("message", { user: admin, message, roome: 0 })
  })

  socket.on("quit", (channel) => {
    const user = getUser(socket.id);
    const rooms = listRooms(contains);
    socket.emit('list', { rooms })
  })

  socket.on("listUsers", (roomName) => {
    const users = listUsers(roomName);
    socket.emit('users', { users })
  })



  //JOIN ROOM
  socket.on("joinRoom", ({ roomName, roomId }) => {
    const user = getUser(socket.id)
    let room = getRoomByName(roomName);
    if (room) {
      room.users.push(getUser(socket.id));
      socket.join(room)
      socket.emit("changedRoom", room)
      socket.emit("message", { roome: room.id, user: admin, message: `Welcome ${user.name} to ${room.name} ` })
      socket.broadcast.to(room.name).emit("message", { user: admin, message: `Ayy ${user.name} has joined ${room.name}` })
      io.to(room.name).emit("allusers", { users: room.users })
    } else {
      room = getRoom(roomId);
      io.to(socket.id).emit("message", { user: admin, message: `Sorry ${user.name}, the room ${roomName} doesn't exist ` })

    }
  })



  //Deconnection 
})
server.listen(5000);

module.exports = app;
