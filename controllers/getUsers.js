const Users = require("../models/Users");

const getUsers = async(req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                id: req.userId
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