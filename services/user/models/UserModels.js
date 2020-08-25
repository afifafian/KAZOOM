const db = require("../config/mongo");
const Users = db.collection("Users");

class UserModel {
    static getAll() {
        return Users.find().toArray();
    }
    static addOne(newOne) {
        return Users.insertOne(newOne);
    }
    static findOne(value) {
        return Users.findOne(value);
    }
}

module.exports = UserModel;
