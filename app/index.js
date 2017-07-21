const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const express_port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect("mongodb://localhost:27017/snippet-organizer");

//Define public api routes
const createUser = require('../routes/api/createuser');
const authenticate = require('../routes/api/authenticate');
const snippets = require('../routes/api/snippets');
app.use('/api/createuser', createUser);
app.use('/api/authenticate', authenticate);
app.use('/api/snippets', snippets);

//Define public user routes
const register = require('../routes/register');
const login = require('../routes/login');
const home = require('../routes/home');
app.use('/register', register);
app.use('/login', login);
app.use('/home', home);

//route middleware for authentication with token
app.use(function (req, res, next) {
    // check header, url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        //verify secret
        jwt.verify(token, 'somesecret', function (err, decoded) {
            if (err)
                return res.json({
                    success: false,
                    message: "Failed to authenticate token."
                });
            else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided"
        });
    }
})

/* ----- Below routes require token -------- */

//Define protected api routes
const post = require('../routes/api/post');
app.use('/api/post',post);

//Define protected user routes
const profile = require('../routes/profile');
app.use('/profile', profile);

app.get('/', function(req, res) {
    res.send(404);
})

app.listen(express_port, () => {
    console.log(`App listening on port ${express_port}`);
})

module.exports = app;