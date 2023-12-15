const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where:{
                email: req.body.email
            }
        });
        if(!user) return res.status(400).json({
            "error": true,
            "message": 'Wrong email or password. Please try again'
        })

        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        if(!correctPassword) return res.status(400).json({
            "error": true,
            "message": 'Wrong email or password. Please try again'
        })

        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '900s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await Users.update({token: refreshToken}, {
            where: {
                id: userId
            } 
        });

        res.json({
            "error": false,
            "message": "success",
            "loginResult": {
                "userId": userId,
                "email": email,
                "token": accessToken
            }
        });

    } catch (error) {
        res.status(500).json({
            "error": true,
            "message": error.message
        });
    }
};

module.exports = login;