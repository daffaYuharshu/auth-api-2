const Users = require("../models/Users");
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const user =  users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(404).send({
            "error": true,
            "message": 'username not found'
        });
    };
    
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send({
                "error": false,
                "message": "success",
                "loginResult": {
                    "userId": user.id,
                    "username": user.username
                }
            });
        } else {
            res.status(400).send({
                "error": true,
                "message": 'Wrong password. Please try again'
            });
        }
    } catch {
        res.status(500).send();
    }
};

module.exports = login;