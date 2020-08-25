const UserModel = require('../models/UserModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

    static async getAll(req, res) {
        try {
            const User = await UserModel.getAll()
            return res.status(200).json(User)
        } catch (error) {
            return res.status(500).json({ "message": error })
        }
    }

    static async register(req, res) {
        try {
            if (req.body.username == "" || !req.body.username) {
                return res.status(400).json({ "message": "username cannot empty" })
            } else if (req.body.password === "" || !req.body.password) {
                return res.status(400).json({ "message": "password cannot empty" })
            }
            const newUser = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
            }
            const currentUser = await UserModel.getAll();
            const validationUser = currentUser.filter(user => user.username === newUser.username)
            if (validationUser.length === 0) {
                const User = await UserModel.addOne(newUser)
                return res.status(201).json(User.ops[0])
            } else {
                return res.status(400).json({ "message": "this username already registered" });
            }
        } catch (error) {
            return res.status(500).json({ "message": error })
        }
    }
    static async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const User = await UserModel.findOne({ username: username });

            if (!User || !bcrypt.compareSync(password, User.password)) {
                return res.status(404).json({ "message": "Invalid username or password"});
            } else {
                const token = jwt.sign(
                    {
                        _id: User._id,
                        username: User.username,
                    },
                    "jwtSECRET"
                );
                return res.status(200).json({ token: token });
            }
        } catch (error) {
            return res.status(500).json({ "message": error })
        }
    }
};

module.exports = UserController;