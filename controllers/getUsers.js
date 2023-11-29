const Users = require("../models/Users");

const getUsers = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findOne({
            where: {
                token: refreshToken
            },
            attributes: ['id','name','email']
        });
        
        if(!user) return res.sendStatus(204);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
};

module.exports = getUsers;