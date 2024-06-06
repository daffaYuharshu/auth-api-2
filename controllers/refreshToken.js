const Users = require("../models/Users");
const jwt = require('jsonwebtoken');

const refreshToken = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({
            where:{
                id: id
            }
        });

        console.log(user.name)
        
        if(!user) return res.sendStatus(403);
        const refreshToken = user.refresh_token;
        console.log(process.env.ACCESS_TOKEN_SECRET)
        console.log(process.env.REFRESH_TOKEN_SECRET)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            console.log(err)
            if(err) return res.sendStatus(403);
            const userId = user.id;
            const name = user.name;
            const email = user.email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '900s'
            });
            
            res.json({accessToken});
        });
    } catch (error) {
        console.log(error)
    }
};

module.exports = refreshToken;