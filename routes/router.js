const express = require('express');
const getUsers = require('../controllers/getUsers');
const register = require('../controllers/register');
const login = require("../controllers/login");
const verifyToken = require("../middleware/verifyToken");
const refreshToken = require("../controllers/refreshToken");
const logout = require('../controllers/logout');

const router =  express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', register); // create account
router.post('/login', login); // login
router.get('/token', refreshToken); // refreshToken
router.delete('/logout', logout); // logout

module.exports = router;