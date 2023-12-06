const Users = require("../models/Users");

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.cookies.userId;
    
    if(!refreshToken && !userId) return res.sendStatus(204);
    const user = await Users.findOne({
        where: {
            token: refreshToken
        }
    });

    if(!user) return res.sendStatus(204);
    const id = user.id;
    await Users.update({token: null}, {
        where: {
            id: id
        }
    }); 

    res.clearCookie('refreshToken');
    res.clearCookie('userId');
    return res.sendStatus(200);
};

module.exports = logout;