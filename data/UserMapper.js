const db = require("../index");

export const getUser = async (id) => {

    db.collection("User", (err, collection) => {
        collection.findById(id);
    })
}

const user = getUser(1);
console.log(user);