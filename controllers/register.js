const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const { nanoid } = require("nanoid");

const register = async (req, res) => {
    const id = nanoid(16);
    const { username, email, password } = req.body;

    // const usernameisExist = Users.find(user => user.username === username);
    // const emailisExist = Users.find(user => user.email === email);

    // // check username
    // if (usernameisExist) {
    //     return res.status(400).send({
    //         "error": true,
    //         "message": "username has been used"
    //     });
    // }

    // // check email
    // if (emailisExist) {
    //     return res.status(400).send({
    //         "error": true,
    //         "message": 'email has been used'
    //     });
    // }

    // // check password
    // if (password.length < 8) {
    //     return res.status(400).send({
    //         "error": true,
    //         "message": 'password must be at least 8 characters'
    //     });
    // }

    // encrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        // push data to database
        await Users.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        res.status(201).send({
            "error": false,
            "message": "account has been created"
        });
    } catch (error){
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = register;