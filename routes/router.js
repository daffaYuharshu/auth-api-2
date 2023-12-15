const express = require('express');
const { check, validationResult } = require('express-validator');
const getUsers = require('../controllers/getUsers');
const register = require('../controllers/register');
const login = require("../controllers/login");
const verifyToken = require("../middleware/verifyToken");
const logout = require('../controllers/logout');
const refreshToken = require('../controllers/refreshToken');

const router =  express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', [
    check('name', 'Invalid name').notEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be at least 8 characters').isLength({min: 8})
] ,register); // create account
router.post('/login', login); // login
router.get('/token/:id', refreshToken);
router.delete('/logout', verifyToken, logout); // logout

module.exports = router;