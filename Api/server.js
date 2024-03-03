const { Sequelize, Model, DataTypes } = require('sequelize');
var express = require('express')
var fs = require('fs')
var http = require('http')
var https = require('https')
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const cors = require("cors");
var compression = require('compression');
var app = express()
app.use(compression()); // Enable compression for all request and responses.
var helmet = require('helmet'); // enable protection for vulnerbilities
app.use(cors()); // Restrict access for only authorized sources
app.options("*", cors());

var applicationSettings = require('app-settings')('settings.json');
process.env.NODE_ENV = applicationSettings.NODE_ENV;

var middleware = function (req, res, next) {
    const dataReq = {
        user: req.headers.username,
        pass: req.headers.password,
        type: req.method,
        url: req.url,
        data: req.body
    };
    console.log("Data Request", dataReq);
    next();
};

app.use(middleware);

////Routing
var crudRouting = require('./routes/crud');
//var areaRouting = require('./routes/area');

////Add routes to use
app.use('/crud', crudRouting);
//app.use('/area', areaRouting);

////Add images folder
app.use('/images', express.static('images'));

////Welcome page
var welcomePage = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="shortcut icon" type="image/png" href="images/favicon.ico"/>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<title>Escuela OnLine API Welcome</title>
</head>
<body style="background-image: url('images/bg_01.jpg'); background-repeat: no-repeat; background-size: cover;">
<div class="container text-center"><br>
<h1>Hola, Bienvenido!</h1>
Te encuentras en el punto de incio de la API EscuelaEnLinea!!!
</div>
</body>
</html>
`;
app.get('/', (req, res) => {
    res.status(200).send(welcomePage)
});

console.log('Enviroment vars: '+process.env.NODE_ENV);
if (process.env.NODE_ENV == 'production') {
    https.createServer(options, app).listen(38001, () => {
        console.log('Server has start at localhost on port 38001: https://ServerNameOrIp:38001');
    });
} else {
    http.createServer(options, app).listen(38001, () => {
        console.log('Server has start at localhost on port 38001: http://localhost:38001');
    });
}


