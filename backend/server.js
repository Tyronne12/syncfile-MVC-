const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/user')
const session = require('express-session');
const path = require('path');
const http = require('http').Server(app);


//const io = require('socket.io')(http); // Pass the HTTP server to socket.io


app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
 saveUninitialized: true,
  cookie: {  maxAge: 86400000 }
}));



app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', userRoute);
app.use('/assets', express.static(__dirname + '/assets'));


app.set('view engine', 'ejs');


http.listen(3001, function() {
    console.log("Server is listening on port 3001");
});
