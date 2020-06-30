const rooms = [{ id: 0, name: "home", users: [], idUser: 'default' }]; //BDD

const createRoom = (name, user) => {
    const id = Date.now();
    if (!name) return { error: "please specify a name" };
    if (!id) return { error: "please specify an id" };
    if (!user || !user.id) return { error: "please specify a valid user" };
    if (getRoom(id)) return { error: "room arleady exists" };
    const Room = {
        id, name, users: [user], idUser: user.id
    };
    //ADD USERS TO BDD
    rooms.push(Room);
    return { Room }
}

const removeRoom = (id, idUser) => {
    const index = rooms.findIndex(room => room.id === id);
    const room = rooms[index];
    if (idUser === room.idUser) return rooms.splice(index, 1);
    return { error: "You don't have the rights to delete this channel" };
}

const removeRoomByName = (name, idUser) => {
    const index = rooms.findIndex(room => room.name === name);
    const room = rooms[index];
    if (idUser === room.idUser) return rooms.splice(index, 1);
    return { error: "You don't have the rights to delete this channel" };
}
const getRoom = (id) => rooms.find(room => room.id === id)
const getRoomByName = (name) => rooms.find(room => room.name === name)
const getUsersInRoom = (id) => getRoom(id).users;
const getRooms = () => rooms;
const addUser = (idRoom, user) => {
    const room = getRoom(idRoom);
    if (room.users.find(usr => usr.id === user.id)) {
        return { error: "User arleady in the room" }
    }
    room.users.push(user)
    return { room };
}


//NOT FINISHED
const deleteUserInRoom = (roomName, user) => {
    const room = getRoom(idRoom);
    const index = room.users.findIndex(usr => usr.id === user.id);
    if (index) {
        return room.users.splice(index, 1);
    } else {
        return { error: "User is not in the room" }
    }
}

const listUsers = (name) => {
    const room = getRoomByName(name)
    return room.users;
}

const listRooms = (word) => rooms.filter(element => element.name.includes(word));
const changeUsernameInRoom = (name, id) => {
    const home = getRoomByName("home")
    const index = home.users.findIndex(usr => usr.id === id);
    const user = home.users[index];
    user.name = name;
    return user

}

module.exports = {
    changeUsernameInRoom,
    addUser, getRoom, listUsers, removeRoom,
    createRoom, getRooms, getRoomByName, removeRoomByName, listRooms
}

/**
 *
 * User have one to many rooms
 * Room have one to many users
 *
 *
 * [{user1,room}, {user2, room}, {user1,room2} ]
 *
 *[{user1,rooms[room1, room2]}, {user2, room}]
 *
 * [{room1, [...users], }]
 */