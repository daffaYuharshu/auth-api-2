const Users = require("../models/Users");

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findOne({
        where: {
            token: refreshToken
        }
    });

    if(!user) return res.sendStatus(204);
    const userId = user.id;
    await Users.update({token: null}, {
        where: {
            id: userId
        }
    });

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
};

module.exports = logout;