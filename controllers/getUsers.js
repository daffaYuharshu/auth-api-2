const Users = require("../models/Users");

const getUsers = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) return res.status(401);
        const user = await Users.findOne({
            where: {
                token: refreshToken
            },
            attributes: ['id','name','email']
        });
        
        if(!user) return res.sendStatus(404);
        res.json(user);
        
    } catch (error) {
        res.status(500).json({
            "error": true,
            "message": error.message
        });
    }
};

module.exports = getUsers;