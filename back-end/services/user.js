const users = []; //BDD
const { addUser } = require("./room");
const createUser = (id, name) => {
    if (!name) return { error: "please specify a name" };
    if (!id) return { error: "please specify an id" };
    //Create a user
    const User = { id, name };

    //ADD user TO BDD
    users.push(User);

    //Add user to room
    const { room, error } = addUser(0, User);
    //Error from room
    if (error) return { error };
    //Success
    return { user: User, room }
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    return users.splice(index, 1)
}

const getUser = (id) => users.find(user => user.id === id)
const getUsers = () => users;
const changeUsername = (name, id) => {
    const user = getUser(id);
    if (!user) {
        return { error: "user doesn't exist" }
    }
    user.name = name;
    return user;
}
module.exports = { getUser, removeUser, createUser, getUsers, changeUsername }
