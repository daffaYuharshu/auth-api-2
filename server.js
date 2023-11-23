const express = require('express');
const bcrypt = require('bcrypt');
const { nanoid } = require("nanoid");

const app = express();
const port = 3000;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const users = [];

// get all users
app.get('/', (req, res) => {
    res.json(users);
});

// create account
app.post('/users', async (req, res) => {
    try {
        const id = nanoid(16);
        const { username, email, password } = req.body;
        
        const usernameisExist = users.find(user => user.username === username);
        const emailisExist = users.find(user => user.email === email);

        // check username
        if (usernameisExist) {
            return res.status(400).send({
                "error": true,
                "message": "username has been used"
            });
        }

        // check email
        if (emailisExist) {
            return res.status(400).send({
                "error": true,
                "message": 'email has been used'
            });
        }

        // check password
        if (password.length < 8) {
            return res.status(400).send({
                "error": true,
                "message": 'password must be at least 8 characters'
            });
        }

        // encrypt password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            id: id,
            username: username,
            email: email,
            password: hashedPassword
        };
        users.push(user);
        res.status(201).send({
            "error": false,
            "message": "account has been created"
        });
    } catch {
        res.status(500).send();
    }
});

// login
app.post('/users/login', async (req, res) => {
    const user =  users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(404).send({
            "error": true,
            "message": 'username not found'
        });
    };
    
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send({
                "error": false,
                "message": "success",
                "loginResult": {
                    "userId": user.id,
                    "username": user.username
                }
            });
        } else {
            res.status(400).send({
                "error": true,
                "message": 'Wrong password. Please try again'
            });
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});