const Users = require("../models/Users");

const logout = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.userId
        }
    });

    if(!user) return res.sendStatus(204);
    const id = user.id;
    await Users.update({token: null}, {
        where: {
            id: id
        }
    }); 

    return res.sendStatus(200);
};

module.exports = logout;