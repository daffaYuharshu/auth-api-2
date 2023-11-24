const express = require('express');
const getUsers = require('../controllers/getUsers');
const register = require('../controllers/register');
const login = require("../controllers/login");

const router =  express.Router();

router.get('/users', getUsers);
// create account
router.post('/users', register);
// login
router.post('/users/login', login);

module.exports = router;