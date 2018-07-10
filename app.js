const express = require('express')
const app = express();
const mongoose = require('mongoose')
const session = require('express-session')
const config = require("./config-local.json");
const bodyParser = require('body-parser');


const UserApiRouter = require('./modules/api/users/router')
const LoginApi = require('./modules/api/auth/router')
const postRouter = require('./modules/api/post/router')


mongoose.connect("mongodb://admin:123a123a@ds125181.mlab.com:25181/exchangememories", function () {
    console.log("connect success")
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: config.secureCookie,
            maxAge: 12 * 60 * 60 * 1000
        }
    })
);

app.use('/api/users',UserApiRouter)
app.use('/api/auth',LoginApi)

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS"
    );

    if (req.headers.origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", true);

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});



app.get("/", (req, res) => {
    res.send("Hello")
})

app.use('/api/post', postRouter)

app.use(express.static('./public'));

const port = process.env.PORT || 3000

app.listen(port)