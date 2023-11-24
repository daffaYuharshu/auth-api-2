const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const { nanoid } = require("nanoid");

const register = async (req, res) => {
    const userId = 'user-' + nanoid(12);
    const { username, email, password } = req.body;

    const usernameIsExist = await Users.findOne({
        where: { username: username },
    });
    const emailIsExist = await Users.findOne({ where: { email: email } });
    

    if (usernameIsExist) {
        return res.status(400).send({
        error: true,
        message: "Username has been used",
        });
    }

    if (emailIsExist) {
        return res.status(400).send({
        error: true,
        message: "Email has been used",
        });
    }

    // check password length
    if (req.body.password.length < 8) {
        return res.status(400).send({
        error: true,
        message: "Password must be at least 8 characters",
        });
    }

    // encrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        // push data to database
        await Users.create({
            id: userId,
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