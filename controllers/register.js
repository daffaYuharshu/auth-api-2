const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const { nanoid } = require("nanoid");
const { check, validationResult } = require('express-validator');

const register = async (req, res) => {
    const userId = 'user-' + nanoid(12);
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json(errors);
    }

    const emailIsExist = await Users.findOne({ where: { email: email } });
    if (emailIsExist) {
        return res.status(400).send({
        error: true,
        message: "Email has been used",
        });
    }

    // encrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        // push data to database
        await Users.create({
            id: userId,
            name: name,
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